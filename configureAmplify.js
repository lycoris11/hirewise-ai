import { Amplify } from 'aws-amplify';
//import config from './aws-exports';

//Amplify.configure(config);


Amplify.configure({
  "aws_project_region": "us-east-2",
  "aws_cognito_identity_pool_id": "us-east-2:7dd56906-6706-4808-a1ca-b8df8dca916b",
  "aws_cognito_region": "us-east-2",
  "aws_user_pools_id": "us-east-2_KJfHpGQVO",
  "aws_user_pools_web_client_id": "4lpcihc24474bt8dic9rc20ar3",
  "oauth": {
      "domain": "hirewise6365a1ec-6365a1ec-dev.auth.us-east-2.amazoncognito.com",
      "scope": [
          "phone",
          "email",
          "openid",
          "profile",
          "aws.cognito.signin.user.admin"
      ],
      "redirectSignIn": "http://localhost:3000/",
      "redirectSignOut": "http://localhost:3000/",
      "responseType": "code"
  },
  "federationTarget": "COGNITO_USER_POOLS",
  "aws_cognito_username_attributes": [
      "EMAIL"
  ],
  "aws_cognito_social_providers": [
      "GOOGLE"
  ],
  "aws_cognito_signup_attributes": [
      "EMAIL"
  ],
  "aws_cognito_mfa_configuration": "OFF",
  "aws_cognito_mfa_types": [
      "SMS"
  ],
  "aws_cognito_password_protection_settings": {
      "passwordPolicyMinLength": 8,
      "passwordPolicyCharacters": []
  },
  "aws_cognito_verification_mechanisms": [
      "EMAIL"
  ],
  "aws_cloud_logic_custom": [
      {
          "name": "api76df32da",
          "endpoint": "https://ohmmd0kz90.execute-api.us-east-2.amazonaws.com/dev",
          "region": "us-east-2"
      }
  ],
  "aws_user_files_s3_bucket": "hirewisef64c7467344b456ea3448f8c3f0b4132191919-dev",
  "aws_user_files_s3_bucket_region": "us-east-2"
});
