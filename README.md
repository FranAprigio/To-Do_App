
# Task Management App

## Overview

This Task Management App is a React Native application designed to help users organize and manage their tasks efficiently. The app allows users to create, view, edit, and delete tasks, as well as track their completion status. It also provides statistical insights into task distribution and completion rates over time.

## Features

- **User Authentication**: Secure login and registration using Firebase Authentication.
- **Task Management**: Create, edit, and delete tasks with detailed information including name, description, type, location, and media attachments.
- **Location Services**: Select and store the location for each task.
- **Media Attachments**: Capture and attach images or videos to tasks.
- **Task Statistics**: Visual representation of task distribution and completion over time using charts.
- **Persistent Storage**: Save and retrieve tasks using AsyncStorage.
- **Navigation**: Smooth navigation between different screens using React Navigation.
- **Responsive Design**: Optimized for various screen sizes and orientations.

## Technologies Used

- **React Native**: Framework for building cross-platform mobile applications.
- **AsyncStorage**: Local storage solution for persisting tasks data.
- **React Native Chart Kit**: Library for displaying charts and graphs.
- **Firebase Authentication**: Secure user authentication and management.
- **Expo Camera**: Capture images and videos within the app.
- **React Navigation**: Navigation library for managing different screens and routes.
- **React Native Picker**: Drop-down menu for selecting task types.
- **React Native Maps**: Integrate maps and select task locations.
- **Expo Vector Icons**: Use of icons for UI components.
- **Expo Location**: Access and utilize device location data.
- **React Native Media Capture**: Component for capturing media within the app.

## Dependencies

Here is a list of dependencies used in the project along with their purposes:

- **@react-native-async-storage/async-storage**: For storing tasks and other data persistently.
- **@react-navigation/native**: Core utilities for React Navigation.
- **@react-navigation/stack**: Stack navigator for screen navigation.
- **axios**: HTTP client for making API requests.
- **expo**: Framework and platform for universal React applications.
- **expo-camera**: Camera component for capturing images and videos.
- **expo-location**: For accessing device location data.
- **expo-permissions**: For handling permissions in Expo apps.
- **firebase**: Firebase SDK for authentication and database services.
- **react-native-chart-kit**: For creating charts and graphs in the statistics screen.
- **react-native-gesture-handler**: For handling gestures in the app.
- **react-native-maps**: For integrating maps and location selection.
- **react-native-picker-select**: For creating drop-down pickers.
- **react-native-reanimated**: For animations in React Native.
- **react-native-safe-area-context**: For handling safe area insets in the app.
- **react-native-screens**: For managing native screen transitions.
- **react-native-vector-icons**: For using vector icons throughout the app.
- **react-redux**: For state management using Redux.
- **redux**: State management library.
- **redux-thunk**: Middleware for handling asynchronous actions in Redux.

## Screens

- **Initial Screen**: Welcome screen with options to log in or register.
- **Register Screen**: User registration form.
- **Login Screen**: User login form.
- **Home Screen**: Dashboard displaying an overview of tasks.
- **List Screen**: List of all tasks with options to view details or edit.
- **Task Form Screen**: Form for creating or editing tasks.
- **Map Screen**: Map interface for selecting task locations.
- **Task Detail Screen**: Detailed view of a specific task.
- **Statistics Screen**: Visual statistics of tasks using pie and bar charts.

## Setup and Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-repository/task-management-app.git
    cd task-management-app
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Configure Firebase**:
    - Create a Firebase project and enable Authentication.
    - Replace the Firebase configuration in `firebaseConfig.js` with your own Firebase project details.

4. **Run the Application**:
    ```bash
    npm start
    ```

5. **Build for Android/iOS**:
    - Follow the Expo documentation for building your app for Android or iOS.

## Contribution

We welcome contributions to improve the Task Management App. Please fork the repository and submit pull requests with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or support, please contact [FrancianeAprigio](mailto:francianefad@outlook.com).
