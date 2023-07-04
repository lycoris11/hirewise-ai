import os
import json
import boto3
import re

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

def escape_string_literals(s):
  s = s.replace("'", "''") #Escape single quotes
  s = s.replace("\\", "\\\\") #Escape backslash
  s = re.sub(r"([\b\f\n\r\t])", r"\\\1", s) #Escape special characters
  return s

def handler(event, context):
  
  #Get Request Body from HTTP POST
  body_string = json.loads(json.dumps(event))['body']
  body_dict = json.loads(body_string)
  
  #Body params
  identity_id = str(body_dict['identityID'])
  jd = str(body_dict['jdName'])

  get_resumes_query = '''SELECT * FROM resume WHERE job_description_id = (SELECT job_description_id FROM job_description WHERE identity_id = :identity_id AND jd_name = :jd)'''
  resume_insert_query_params = [
    {
      'name': 'identity_id',
      'value': {'stringValue': identity_id}
    },
    {
      'name': 'jd',
      'value': {'stringValue': jd}
    }
  ]
  response = execute_statement(get_resumes_query, resume_insert_query_params)
  print(response)
    
  return {
    'statusCode': 200,
    'headers': {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
    "Content-Type": "application/json"
    },
    'body': json.dumps({
      'response':response
    })
  }
  
