import os
import json
import boto3
import fitz
from botocore.exceptions import WaiterError
#import time
#from PyPDF2 import PdfReader


def handler(event, context):
  
  body_string = json.loads(json.dumps(event))['body']
  body_dict = json.loads(body_string)
  
  bucket_name = 'hirewisef64c7467344b456ea3448f8c3f0b4132191919-dev'
  s3_file_path = 'private/' + body_dict['identityID'] + '/' + body_dict['fileName']
  local_file_name = '/tmp/local.pdf'
  
  print(bucket_name)
  print(s3_file_path)
  
  s3 = boto3.client('s3')
  
  try:
    print('Waiting')
    waiter = s3.get_waiter('object_exists')
    waiter.wait(
        Bucket=bucket_name,
        Key=s3_file_path,
        WaiterConfig={
          'Delay': 2, 
          'MaxAttempts': 5
        }
    )
    
    s3.download_file(
      Bucket=bucket_name, 
      Key=s3_file_path,
      Filename=local_file_name
    )
    print('File Downloaded')
  except WaiterError:
    print(f"Object {s3_file_path} in {bucket_name} never became available.")
  
  print('Getting Text')
  text = ''
  with fitz.open(local_file_name) as document:
    for page in document:
      text += page.get_text()

    
  return {
    'statusCode': 200,
    'headers': {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
    "Content-Type": "application/json"
    },
    'body': json.dumps({
      'response':text
    })
  }
  
  '''
  with open('/tmp/local.pdf', 'rb') as pdf_file:
    pdf_reader = PdfReader(pdf_file)
    text = ''.join([page.extract_text() for page in pdf_reader.pages])
    
  print(text)
  '''
