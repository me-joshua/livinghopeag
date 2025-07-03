import requests
import sys
import json
from datetime import datetime

class LivingWaterChurchAPITester:
    def __init__(self, base_url):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                result = {"name": name, "status": "PASSED", "response": response.text[:100] + "..." if len(response.text) > 100 else response.text}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                result = {"name": name, "status": "FAILED", "expected": expected_status, "got": response.status_code, "response": response.text}
            
            self.test_results.append(result)
            return success, response.json() if success and response.text else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.test_results.append({"name": name, "status": "ERROR", "error": str(e)})
            return False, {}

    def test_health_check(self):
        """Test the health check endpoint"""
        return self.run_test(
            "Health Check",
            "GET",
            "api/health",
            200
        )

    def test_get_church_info(self):
        """Test getting church information"""
        return self.run_test(
            "Get Church Info",
            "GET",
            "api/church-info",
            200
        )

    def test_get_sermons(self):
        """Test getting all sermons"""
        return self.run_test(
            "Get Sermons",
            "GET",
            "api/sermons",
            200
        )

    def test_get_events(self):
        """Test getting all events"""
        return self.run_test(
            "Get Events",
            "GET",
            "api/events",
            200
        )

    def test_submit_contact_form(self):
        """Test submitting a contact form"""
        data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "123-456-7890",
            "subject": "Test Subject",
            "message": "This is a test message",
            "contact_permission": True
        }
        return self.run_test(
            "Submit Contact Form",
            "POST",
            "api/contact",
            200,
            data=data
        )

    def test_submit_prayer_request(self):
        """Test submitting a prayer request"""
        data = {
            "name": "Prayer Test User",
            "email": "prayer@example.com",
            "prayer_request": "This is a test prayer request"
        }
        return self.run_test(
            "Submit Prayer Request",
            "POST",
            "api/prayer-request",
            200,
            data=data
        )

    def test_get_specific_sermon(self, sermon_id):
        """Test getting a specific sermon"""
        return self.run_test(
            "Get Specific Sermon",
            "GET",
            f"api/sermons/{sermon_id}",
            200
        )

    def test_get_specific_event(self, event_id):
        """Test getting a specific event"""
        return self.run_test(
            "Get Specific Event",
            "GET",
            f"api/events/{event_id}",
            200
        )

    def test_create_event(self):
        """Test creating a new event"""
        data = {
            "title": "Test Event",
            "description": "This is a test event",
            "date": "April 15, 2025",
            "time": "2:00 PM",
            "location": "Test Location",
            "image_url": "https://example.com/image.jpg",
            "is_upcoming": True
        }
        return self.run_test(
            "Create Event",
            "POST",
            "api/events",
            200,
            data=data
        )

    def test_create_sermon(self):
        """Test creating a new sermon"""
        data = {
            "title": "Test Sermon",
            "description": "This is a test sermon",
            "youtube_url": "https://www.youtube.com/embed/test",
            "pastor": "Test Pastor",
            "date": "April 15, 2025"
        }
        return self.run_test(
            "Create Sermon",
            "POST",
            "api/sermons",
            200,
            data=data
        )

    def test_invalid_route(self):
        """Test an invalid route"""
        return self.run_test(
            "Invalid Route",
            "GET",
            "api/nonexistent",
            404
        )

    def print_summary(self):
        """Print a summary of the test results"""
        print("\n" + "="*50)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        print("="*50)
        
        if self.tests_passed == self.tests_run:
            print("✅ All tests passed!")
        else:
            print("❌ Some tests failed:")
            for result in self.test_results:
                if result["status"] != "PASSED":
                    print(f"  - {result['name']}: {result['status']}")
        
        return self.tests_passed == self.tests_run

def main():
    # Get the backend URL from the frontend .env file
    with open('/app/frontend/.env', 'r') as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL='):
                backend_url = line.strip().split('=')[1]
                break
    
    print(f"Using backend URL: {backend_url}")
    
    # Setup
    tester = LivingWaterChurchAPITester(backend_url)
    
    # Run tests
    tester.test_health_check()
    tester.test_get_church_info()
    
    # Test sermons endpoints
    success, sermons_data = tester.test_get_sermons()
    if success and sermons_data:
        sermon_id = sermons_data[0]["id"]
        tester.test_get_specific_sermon(sermon_id)
    
    # Test events endpoints
    success, events_data = tester.test_get_events()
    if success and events_data:
        event_id = events_data[0]["id"]
        tester.test_get_specific_event(event_id)
    
    # Test form submissions
    tester.test_submit_contact_form()
    tester.test_submit_prayer_request()
    
    # Test creating new items
    tester.test_create_event()
    tester.test_create_sermon()
    
    # Test error handling
    tester.test_invalid_route()
    
    # Print results
    success = tester.print_summary()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())