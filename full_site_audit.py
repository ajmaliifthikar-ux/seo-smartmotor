from playwright.sync_api import sync_playwright
import os

routes = [
    "/",
    "/about",
    "/services",
    "/packages",
    "/hub",
    "/contact",
    "/leyla",
    "/user/login",
    "/user/register",
    "/user/dashboard",
    "/admin/dashboard",
    "/admin/strategy-lab",
    "/admin/studio"
]

viewports = [
    {"name": "mobile", "width": 375, "height": 812},
    {"name": "tablet", "width": 768, "height": 1024},
    {"name": "desktop", "width": 1440, "height": 900}
]

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        
        # Create output directory
        output_dir = "audit_screenshots"
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
            
        for route in routes:
            for vp in viewports:
                page = context.new_page()
                page.set_viewport_size({"width": vp["width"], "height": vp["height"]})
                
                url = f"http://localhost:3000{route}"
                print(f"Auditing {url} ({vp['name']})...")
                
                try:
                    page.goto(url, timeout=60000)
                    page.wait_for_load_state('networkidle', timeout=60000)
                    
                    # Sanitize filename
                    filename = route.replace("/", "_") if route != "/" else "home"
                    filepath = os.path.join(output_dir, f"{filename}_{vp['name']}.png")
                    
                    page.screenshot(path=filepath, full_page=True)
                except Exception as e:
                    print(f"Error auditing {url}: {e}")
                finally:
                    page.close()
                    
        browser.close()

if __name__ == "__main__":
    run()
