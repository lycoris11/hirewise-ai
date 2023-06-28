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
  
  resume_id = str(uuid.uuid1()).replace('-', '')
  identity_id = str(body_dict['identityID'])
  jd = str(body_dict['jdName'])
  score = str(body_dict['score'])
  resume_text = escape_string_literals(str(body_dict['resumeText']))
  resume_output = str(body_dict['resumeOutput'])
  

  #job_description_query = '''INSERT INTO job_description (job_description_id, identity_id, jd_name, jd_text) VALUES (:job_description_id, :identity_id, :jd_name, :jd_text);'''
  #resume_query = f"INSERT INTO resume (resume_id, identity_id, job_description_id, output, score) VALUES ('{identity_id}', (SELECT job_description_id FROM job_description WHERE identity_id = '{identity_id}' AND text = '{text_data}'), '', '', 0);"
  
  '''job_description_id_query = 'SELECT job_description_id FROM job_description WHERE identity_id = :identity_id AND jd_name = :jd'
  jd_query_params = [
    {
      'name':'identity_id',
      'value':{ 'stringValue':identity_id }
    },
    {
      'name':'jd',
      'value':{ 'stringValue':jd }
    }
  ]'''

  
  #LEFT OFF HERE

  resume_insert_query = '''INSERT INTO resume (resume_id, identity_id, job_description_id, score, resume_text, resume_output) VALUES (:resume_id, :identity_id, (SELECT job_description_id FROM job_description WHERE identity_id = :identity_id AND jd_name = :jd), :score, :resume_text, :resume_output);'''
  resume_insert_query_params = [
    {
      'name':'resume_id',
      'value':{ 'stringValue':resume_id }
    },
    {
      'name': 'identity_id',
      'value': {'stringValue': identity_id}
    },
    {
      'name': 'score',
      'value': {'stringValue': score}
    },
    {
      'name': 'jd',
      'value': {'stringValue': jd}
    },
    {
      'name': 'resume_text',
      'value': {'stringValue': resume_text}
    },
    {
      'name': 'resume_output',
      'value': {'stringValue': resume_output}
    }
  ]
  response = execute_statement(resume_insert_query, resume_insert_query_params)
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
  
