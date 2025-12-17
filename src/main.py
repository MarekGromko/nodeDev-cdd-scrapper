import utils.init_log  # noqa: F401
import typer


app = typer.Typer()

@app.command()
def fetch(date: str, allow_dups: bool = False):
    """Fetch historical exchange rates given a date"""
    from exchangeratesapi import fetch_specific
    fetch_specific(date, allow_dups=allow_dups)

@app.command()
def latest():
    """Give you the latest exchange rates fetched"""
    from exchangeratesapi import get_latest
    print(get_latest().get("date"))

@app.command()
def oldest():
    """Give you the oldest exchange rates fetched"""
    from exchangeratesapi import get_oldest
    print(get_oldest().get("date"))

@app.command()
def interactive():
    """Start the interactive menu"""
    choices = {
        "1": "Get latest rates saved",
        "2": "Get oldest rates saved",
        "3": "Fetch specific date rates",
        "h": "Show this menu again",
        "Any": "Quit"
    }
    def print_menu():
        print("\nMenu:")
        for key, value in choices.items():
            print(f"{key}. {value}")
    print_menu()

    while True:
        choice = input("Enter choice: ")
        if choice == "1":
            from exchangeratesapi import get_latest
            print(get_latest().get("date"))
        elif choice == "2":
            from exchangeratesapi import get_oldest
            print(get_oldest().get("date"))
        elif choice == "3":
            date = input("Enter specific date (YYYY-MM-DD): ")
            allow_dups = input("Allow duplicates? (y/any): ").lower() == 'y'
            from exchangeratesapi import fetch_specific
            fetch_specific(date, allow_dups=allow_dups)
        elif choice.lower() == "h":
            print_menu()
        else:
            print("Exiting.")
            break


if __name__ == "__main__":
    app()