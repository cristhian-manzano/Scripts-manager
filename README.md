# Bash Script Manager

A simple Electron app that allows users to manage and execute bash scripts with a user-friendly interface. The app supports adding bash scripts, executing them, and tracking the last execution time. It is packaged as a `.deb` file for easy distribution and installation on Ubuntu Linux.

## Table of Contents

- [Bash Script Manager](#bash-script-manager)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [From Source](#from-source)
    - [Using the `.deb` Package](#using-the-deb-package)
  - [Usage](#usage)
    - [Adding Scripts](#adding-scripts)
    - [Running Scripts](#running-scripts)
    - [Deleting Scripts](#deleting-scripts)
  - [Development](#development)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)
  - [Acknowledgments](#acknowledgments)

---

## Features

- **Add Bash Scripts**: Users can add bash scripts from their file system.
- **Execute Scripts**: Run bash scripts directly from the app with one click.
- **Track Last Execution**: The app displays the last time each script was executed.
- **Simple Interface**: Easy-to-use UI for managing scripts.
- **Cross-Platform**: Works on Linux, and packaging for other platforms can be added.

---

## Prerequisites

To run the app from source, you'll need:

- **Node.js**: v14.x or higher
- **npm**: v6.x or higher
- **Electron**: Installed via npm
- **Ubuntu Linux**: For the `.deb` package

---

## Installation

### From Source

1. **Clone the repository**:

    ```bash
    git clone https://github.com/cristhian-manzano/bash-script-manager.git
    cd bash-script-manager
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Run the app in development mode**:

    ```bash
    npm start
    ```

    This will start the app in development mode with **Electron**.

### Using the `.deb` Package

1. Download the latest `.deb` package from the [Releases page](https://github.com/cristhian-manzano/bash-script-manager/releases).
2. Install the package using `dpkg`:

    ```bash
    sudo dpkg -i bash-script-manager-x.x.x.deb
    ```

3. Run the app from the application menu or by typing:

    ```bash
    bash-script-manager
    ```

---

## Usage

### Adding Scripts

- Click on the **"Choose File"** button to select a bash script (`.sh`) from your file system.
- The script name and path will be added to the table.

### Running Scripts

- Click the **"Play"** button next to the script you want to run.
- A loader will appear, showing the name of the script being executed.
- The output will be displayed in the **Output** section.

### Deleting Scripts

- Click the **"Delete"** button next to the script you want to remove from the list.
- The script will be removed from the table, but it won't be deleted from your file system.

---

## Development

To contribute or modify the project, follow these steps:

1. **Fork the repository**.
2. **Create a new branch**:

    ```bash
    git checkout -b feature/my-new-feature
    ```

3. **Make your changes** and commit them:

    ```bash
    git commit -m 'Add some feature'
    ```

4. **Push your changes** to the branch:

    ```bash
    git push origin feature/my-new-feature
    ```

5. **Create a Pull Request** on GitHub.

---

## Contributing

Contributions are welcome! Please follow the guidelines below:

- Fork the repository and create your feature branch.
- Add clear, helpful documentation.
- Ensure all changes are properly tested.
- Create a detailed pull request with a clear description of the changes.

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## Contact

If you have any questions or issues, feel free to open an issue or contact me at [crisven1998@gmail.com].

---

## Acknowledgments

- [Electron](https://electronjs.org/) for providing the framework to build this app.
- [Node.js](https://nodejs.org/) for the backend.
- All open-source libraries used in this project.
