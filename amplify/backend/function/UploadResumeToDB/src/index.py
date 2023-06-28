import os
import json
import boto3
import uuid
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
  
  body_string = json.loads(json.dumps(event))['body']
  body_dict = json.loads(body_string)
  
  identity_id = str(body_dict['identityID'])
  jd = str(body_dict['jdName'])

  #job_description_query = '''INSERT INTO job_description (job_description_id, identity_id, jd_name, jd_text) VALUES (:job_description_id, :identity_id, :jd_name, :jd_text);'''
  #resume_query = f"INSERT INTO resume (resume_id, identity_id, job_description_id, output, score) VALUES ('{identity_id}', (SELECT job_description_id FROM job_description WHERE identity_id = '{identity_id}' AND text = '{text_data}'), '', '', 0);"
  
  job_description_id_query = '''SELECT job_description_id FROM job_description WHERE identity_id = :identity_id AND jd_name = :jd'''
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
  job_description_id = execute_statement(job_description_id_query, jd_query_params)['records'][0][0]['stringValue']

  resume_id = str(uuid.uuid1()).replace('-', '')
  resume_text = escape_string_literals(str(body_dict['text']))
  jd_name = str(body_dict['fileName'])

  #LEFT OFF HERE

  resume_insert_query = '''INSERT INTO resume (resume_id, identity_id, job_description_id, score, resume_text, jd_name, jd_text) VALUES (:job_description_id, :identity_id, :jd_name, :jd_text);'''
  resume_insert_query_params = [
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
  '''
  response = execute_statement(job_description_query, params)
  '''
  response = ''
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
  
