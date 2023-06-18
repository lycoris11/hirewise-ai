import os
import json
import boto3
import uuid
import re

rds_client = boto3.client('rds-data')

database_name = 'hirewise'
db_cluster_arn = 'arn:aws:rds:us-east-2:839858686902:cluster:hirewise-db'
db_credentials_secrets_store_arn = os.environ['rds_secret']

def execute_statement(postgres, params):
  response = rds_client.execute_statement(
    secretArn=db_credentials_secrets_store_arn,
    database=database_name,
    resourceArn=db_cluster_arn,
    sql=postgres,
    parameters=params
  )
  return response

def escape_string_literals(s):
  s = s.replace("'", "''") #Escape single quotes
  s = s.replace("\\", "\\\\") #Escape backslash
  s=re.sub(r"([\b\f\n\r\t])", r"\\\1", s) #Escape special characters
  return s

def handler(event, context):
  
  body_string = json.loads(json.dumps(event))['body']
  body_dict = json.loads(body_string)
  
  job_description_id = str(uuid.uuid1()).replace('-', '')
  identity_id=str(body_dict['identityID'])
  jd_text=escape_string_literals(str(body_dict['text']))
  jd_name=str(body_dict['fileName'])
  
  job_description_query = '''INSERT INTO job_description (job_description_id, identity_id, jd_name, jd_text) VALUES (:job_description_id, :identity_id, :jd_name, :jd_text);'''

  params = [
    {
      'name': 'job_description_id',
      'value': {'stringValue': job_description_id}
    },
    {
      'name': 'identity_id',
      'value': {'stringValue': identity_id}
    },
    {
      'name': 'jd_name',
      'value': {'stringValue': jd_name}
    },
    {
      'name': 'jd_text',
      'value': {'stringValue': jd_text}
    }
  ]
  
  response = execute_statement(job_description_query, params)
  
  print(response)
  
  text = ''
    
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
  
