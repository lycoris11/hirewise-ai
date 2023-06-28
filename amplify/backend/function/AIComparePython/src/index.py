import os
import json
import openai
import boto3

lambda_client = boto3.client('lambda')
openai.api_key = os.environ['openai_api_key']

rds_client = boto3.client('rds-data')
DATABASE_NAME = 'hirewise'
DB_CLUSTER_ARN = 'arn:aws:rds:us-east-2:839858686902:cluster:hirewise-db'
DB_CREDENTIALS_SECRETS_STORE_ARN = os.environ['rds_secret']

def execute_statement(postgres, params):
  response = rds_client.execute_statement(
    secretArn = DB_CREDENTIALS_SECRETS_STORE_ARN,
    database = DATABASE_NAME,
    resourceArn = DB_CLUSTER_ARN,
    sql = postgres,
    parameters = params
  )
  return response

def handler(event, context):
  
  #Get Request Body from HTTP POST
  body_string = json.loads(json.dumps(event))['body']
  body_dict = json.loads(body_string)
  
  #Body params
  identity_id = str(body_dict['identityID'])
  jd = str(body_dict['jdName'])
  resume = body_dict['resumeText']
  
  #Get Job Description Text
  jd_text_query = '''SELECT jd_text FROM job_description WHERE identity_id = :identity_id AND jd_name = :jd'''
  jd_query_params = [
    {
      'name':'identity_id',
      'value':{ 'stringValue':identity_id }
    },
    {
      'name':'jd',
      'value':{ 'stringValue':jd }
    }
  ]
  job_description = execute_statement(jd_text_query, jd_query_params)['records'][0][0]['stringValue']
  
  model_to_use = 'gpt-3.5-turbo'
  input_prompt = [{"role": "system", "content" : "You are to act as an experienced recruiter. I give you a job description. Then, I will give you a resume. You will give key reasons why or why not to reach out. On the final line of your output you will score the candidate on a scale of 1-10. Provide a score in the format Score: X and do not include a period. 1 being not likely to reach out for an interview, and 10 being that you will reach out for an interview. Limit your response to 50 words."},
                  {"role": "assistant", "content" : "Can you please provide me with the Job Description?"},
                  {"role": "user", "content" : f'Below this line is the job description:\n{job_description}'},
                  {"role": "assistant", "content" : "Thank you for providing the job description. Please provide me with the candidate's resume"},
                  {"role": "user", "content" : f'Below this line is the candidate\'s resume:\n{resume}'}]
  
  
  completion = openai.ChatCompletion.create(
      model = model_to_use,
      messages = input_prompt,
      temperature = 0.7
  )
  
  text_response = completion['choices'][0]['message']['content'].strip()
  
  return {
    'statusCode': 200,
    'headers': {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
    "Content-Type": "application/json"
    },
    'body': json.dumps({
      'response': text_response
    })
  }
  
'''
def get_api_key():
  response = lambda_client.invoke(
    FunctionName = 'arn:aws:lambda:us-east-2:839858686902:function:openai_get_api_key',
    InvocationType = 'RequestResponse'
  )
  openai_api_key = json.load(response['Payload'])['body']['api_key']
  return openai_api_key
'''