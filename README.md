# Telephone Scheduling System

## Overview

This project is an implementation of a telephone scheduling system developed in **Angular**. The main objective is to allow the registration, consultation, editing, and deactivation of contacts, as well as enabling the marking of favorite contacts. The project is structured in an organized manner, following best development practices and ensuring route security through **Guards**.

<p align="center">
  <img src="public/assets/readme/img1.png" width="90%" float="center" style="border-radius: 8px"/>
</p>

## Technologies Used

- **Angular 19.2.0** (latest version)
- **TypeScript**
- **Bootstrap 5.3.3** (for styling and responsiveness)
- **ngx-ui-switch 15.0.0** (for switch component - Implementation of Favorite and Active contacts)
- **ngx-mask 19.0.6** (for input masks)
- **Angular Router** (for page navigation)
- **Guards** (for route protection)
- **Angular Testing (Jasmine/Karma)** (for unit testing)

## Features

### 1. Contact Registration Screen

- Form to register a new contact.
- Validation to check if the phone number has already been registered.
- Error messages and user feedback.

<p align="center">
  <img src="public/assets/readme/img2.png" width="90%" float="center" style="border-radius: 8px"/>
</p>

### 2. Contact Consultation Screen

- Search field to quickly find contacts.
- Display of the list of registered contacts.
- Visual indication for favorite contacts.

<p align="center">
  <img src="public/assets/readme/img3.png" width="90%" float="center" style="border-radius: 8px"/>
</p>

### 3. Contact Update and Deactivation

- Ability to edit an existing contact's information.
- Option to deactivate contacts, preventing their use without permanently deleting them.
- Filter to display or hide inactive contacts.

### 4. Favorites

- Option to mark/unmark a contact as a favorite.
- Visual highlight for favorite contacts.

<p align="center">
  <img src="public/assets/readme/img5.png" width="90%" float="center" style="border-radius: 8px"/>
</p>

## Project Structure

The project follows a modular structure to facilitate maintenance and scalability:

```
├── src
│   ├── app
│   │   ├── modules
│   │   │   ├── contacts (contacts module)
│   │   │   ├── login (authentication module)
│   │   ├── app-route.ts
│   │   ├── app.component.ts
│   │   ├── shared (reusable resources)
│   ├── environments (environment configuration)
```

## Route Protection

- Implementation of **Guards** to restrict access to certain pages.
- Use of **AuthGuard** to check permissions before navigation.

## Unit Testing

Unit tests have been implemented using **Jasmine and Karma**.

<p align="center">
  <img src="public/assets/readme/img4.png" width="90%" float="center" style="border-radius: 8px"/>
</p>

## How to Run the Project

### 1. Clone the Repository

```
git clone https://github.com/DanielSoaresRocha/l2code-test.git
cd telephone-scheduling
```

### 2. Install Dependencies

```
npm install
```

### 3. Run the Server

```
npm run start
```

The application will be available at `http://localhost:4200/`.

### 4. Run Unit Tests

```
npm test
```

## Final Considerations

This project was developed following best development practices, ensuring clean, organized, and secure code. The implementation of unit tests reinforces the reliability of the system, and the use of **Guards** ensures route protection.

For suggestions, improvements, or contributions to the project, feel free to open a Pull Request or get in touch.

---

## License 📝

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the [LICENSE](LICENSE) file for details.

## Author

<table>
  <tr>
    <td align="center"><a href="https://github.com/DanielSoaresRocha"><img src="https://avatars0.githubusercontent.com/u/43214747?s=400&u=a267d113c5469b84bf87d202cdb7129330e4c865&v=4" width="100px;" alt="Daniel Soares"/><br /><sub><b>Daniel Soares</b></sub></a><br /><a href="https://github.com/DanielSoaresRocha/ESIG-challenge/commits?author=DanielSoaresRocha" title="Code">💻</a></td>
  <tr>
</table>
