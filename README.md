# HirewiseAI 👔🧠

HirewiseAI is an intelligent recruitment platform that leverages artificial intelligence and machine learning algorithms to assist in the hiring process. This repository contains the source code for the platform. 🚀

## Technologies Used 🛠️

- Front End: Next.js (React) and TailwindCSS + Tailwind UI 💻🎨
- Back End: Serverless via API Gateway (REST) + AWS Lambda (Python) ⚙️🔧
- Persistent Storage: S3 and Amazon RDS (Serverless Aurora PostgreSQL) 💾🌩️

## Installation 📥

1. Clone the repository: `git clone https://github.com/lycoris11/hirewise-ai.git`
2. Install dependencies: `npm install` (for front end) and `pip install -r requirements.txt` (for back end)
3. Set up the necessary AWS resources, including API Gateway, Lambda functions, S3 bucket, and RDS instance (Serverless Aurora PostgreSQL).
4. Rename the `.env.example` file in the root directory to `.env`, and fill in the required environment variables for your AWS resources and any other necessary configurations (OpenAI key).
5. Start the development server: `npm run dev`. 🚀✨

## Usage 🚀

The platform consists of both a front-end and a back-end component.

### Front End ✨

The front end of the platform is built using Next.js and TailwindCSS. It provides a user-friendly web interface for interacting with the AI-powered recruitment features. To start the front end, run `npm run dev` from the root directory.

### Back End ⚙️

The back end of the platform is built using Serverless architecture, API Gateway, AWS Lambda, and Python. The backend handles the business logic and connects to the necessary AWS services, such as S3 and Amazon RDS (Serverless Aurora PostgreSQL). To start the back end, ensure that the necessary AWS resources are set up and configured, and run the Lambda functions triggered by the API Gateway.

## Contributing 🤝

Contributions to this project are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your branch on your forked repository.
5. Submit a pull request to the main repository.

Please ensure that your code follows the existing code style and adhere to best practices. Also, make sure to include relevant tests for your changes.

## License 📝

This project is licensed under the Apache 2.0 License.

## Credits ❤️

- **HirewiseAI** is developed and maintained by [lycoris11](https://github.com/lycoris11).
- The technologies used in this project are open source and maintained by their respective communities.
