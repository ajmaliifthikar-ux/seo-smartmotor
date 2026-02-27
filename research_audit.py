from playwright.sync_api import sync_playwright
import time
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        # Navigate to homepage
        print("Navigating to http://localhost:3000...")
        page.goto('http://localhost:3000', timeout=120000)
        page.wait_for_load_state('networkidle', timeout=120000)
        
        # Take full page screenshot
        print("Taking full page screenshot...")
        page.screenshot(path='audit_homepage_full.png', full_page=True)
        
        # Identify sections and take individual screenshots
        sections = page.locator('section').all()
        for i, section in enumerate(sections):
            id_attr = section.get_attribute('id') or f"section_{i}"
            print(f"Taking screenshot of section: {id_attr}")
            section.screenshot(path=f'audit_section_{id_attr}.png')
            
        # Specifically look for booking section
        booking_section = page.locator('#booking, [class*="booking"], section:has-text("Book")').first
        if booking_section.count() > 0:
            print("Found booking section, taking detailed screenshot...")
            booking_section.screenshot(path='audit_booking_section.png')
            
            # Interact with booking to see if it's "fully dark"
            # Try to click any "Book Now" buttons if present to open modals etc.
            book_buttons = page.locator('button:has-text("Book")').all()
            for j, btn in enumerate(book_buttons):
                try:
                    print(f"Clicking book button {j}...")
                    btn.click()
                    page.wait_for_timeout(1000) # Wait for animation/modal
                    page.screenshot(path=f'audit_booking_modal_{j}.png')
                    # Close modal if possible or refresh
                    page.keyboard.press('Escape')
                    page.wait_for_timeout(500)
                except Exception as e:
                    print(f"Could not click button {j}: {e}")

        # Check for Google Wallet button
        wallet_btn = page.locator('button:has-text("Google Wallet"), [aria-label*="Google Wallet"]').first
        if wallet_btn.count() > 0:
            print("Found Google Wallet button, taking screenshot...")
            wallet_btn.screenshot(path='audit_wallet_button.png')
        else:
            print("Google Wallet button not found on homepage.")

        browser.close()

if __name__ == "__main__":
    run()
