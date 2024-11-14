# Digilance

## Contributing

We welcome contributions from the community! If you'd like to contribute, follow these steps:

1. **Fork the Repository**

   - Click the **Fork** button at the top right of this page to create a copy of the repository on your GitHub account.

2. **Clone Your Fork**

   - Clone your forked repository to your local machine using:
     ```bash
     git clone https://github.com/YOUR-USERNAME/REPOSITORY-NAME.git
     ```

3. **Navigate to the Project Directory**

   - Change into the project directory:
     ```bash
     cd path/Digilance
     ```

4. **Download Dependencies**

   - Install the necessary dependencies for both the frontend and backend:

     ```bash
     # For the backend
     cd ./backend
     npm install nodemon
     npm install

     # For the frontend
     cd ./frontend
     npm install
     ```

5. **Create a New Branch**

   - Create a new branch for your changes:
     ```bash
     git checkout -b feature/your-feature-name
     ```

6. **host the website**

   - host the website on localhost:
     ```bash
     npm run dev
     ```

7. **Start the backend server**

   - open another terminal and type this:
     ```bash
     cd ./backend
     nodemon ./server.js
     ```

8. **Make Your Changes**

   - Add your new features, fix bugs, or improve the code/documentation.

9. **Commit Your Changes**

   - After making your changes, stage and commit them:
     ```bash
     git add .
     git commit -m "Describe your changes"
     ```

10. **Push to Your Fork**

    - Push your changes to your forked repository:
      ```bash
      git push origin feature/your-feature-name
      ```

11. **Submit a Pull Request**

    - Go to the original repository on GitHub and create a pull request. Be sure to:
    - Describe the changes you've made.
    - Mention any issues that are related to your changes.

12. **Wait for Review**

    - Your pull request will be reviewed. If any changes are requested, update your pull request accordingly.

Now you're ready to contribute! Thank you for your help in improving this project.
