import os
import json

def make_profile_path(profile_name: str) -> str:
    return os.path.join("profiles", f"{profile_name}.json")

def load_profile(profile_name: str): 
    profile_path = make_profile_path(profile_name)
    if not os.path.exists(profile_path):
        return {}
    with open(profile_path, "r") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return {}
        
def save_profile(profile_name: str, profile_data: dict):
    profile_path = make_profile_path(profile_name)
    with open(profile_path, "w") as f:
        json.dump(profile_data, f, indent=2)