import os
import json
import boto3

rds_client = boto3.client('rds-data')

database_name = 'hirewise'
db_cluster_arn = 'arn:aws:rds:us-east-2:839858686902:cluster:hirewise-db'
db_credentials_secrets_store_arn = os.environ['rds_secret']

def execute_statement(postgres):
  response = rds_client.execute_statement(
    secretArn=db_credentials_secrets_store_arn,
    database=database_name,
    resourceArn=db_cluster_arn,
    sql=postgres
  )
  
  return response

def handler(event, context):
  
  response = execute_statement('select * from hirewise.users')
  
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
  
