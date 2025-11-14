# Quiz Application

A simple, interactive quiz application built with vanilla JavaScript and a JSON Server backend. This project demonstrates modern front-end development practices including ES6 modules, async/await, and SASS preprocessing.
## 📦 Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm (comes with Node.js)

## 🚀 Installation

1. **Clone or download the repository**

2. **Navigate to the project directory**
   ```bash
   cd quiz_JSON
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Build the SASS styles**
   ```bash
   npm run sass:build
   ```

## ▶️ Running the Application

You need to run **two commands simultaneously** in separate terminal windows:

### Terminal 1 - Start the Development Server
```bash
npm run dev
```
This starts the lite-server on `http://localhost:8000`

### Terminal 2 - Start the JSON Server
```bash
npm run json:server
```
This starts the JSON Server (typically on port 3000) to serve quiz questions

Once both servers are running, open your browser and navigate to:
```
http://localhost:8000
```

## 🎮 How to Use

1. **Start the Application**: Follow the running instructions above
2. **Answer Questions**: Click on one of the answer buttons
3. **View Feedback**: Correct answers turn green, incorrect ones turn red
4. **Next Question**: Click the "Next" button to proceed
5. **View Score**: After all questions, see your final score
6. **Play Again**: Click "Play Again" to restart the quiz

## ✏️ Customizing Quiz Questions

To add or modify quiz questions, edit the `data/db.json` file:

```json
{
  "questions": [
    {
      "id": 1,
      "question": "Your question here?",
      "answers": [
        {
          "id": 1,
          "text": "Answer option 1",
          "correct": true
        },
        {
          "id": 2,
          "text": "Answer option 2",
          "correct": false
        }
      ]
    }
  ]
}
```

**Note**: The JSON Server will automatically reload with your changes.

## 🎨 Customizing Styles

The application uses SASS for styling. To modify the appearance:

1. Edit the SASS files in `src/styles/`
2. Run `npm run sass:dev` to watch for changes
3. Or run `npm run sass:build` for a one-time compilation
