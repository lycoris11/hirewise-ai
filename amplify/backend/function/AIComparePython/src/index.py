import json
import openai
import boto3

def get_api_key():
  lambda_client = boto3.client('lambda')
  response = lambda_client.invoke(
    FunctionName = 'arn:aws:lambda:us-east-2:839858686902:function:openai_get_api_key',
    InvocationType = 'RequestResponse'
  )
  openai_api_key = json.load(response['Payload'])['body']['api_key']
  return openai_api_key

def handler(event, context):
  #data_string = json.dumps(event)
  #body_string = json.loads(data_string)['body']
  body_string = json.loads(json.dumps(event))['body']
  body_dict = json.loads(body_string)
  job_description = body_dict['job_description']
  resume = body_dict['resume']
  
  model_to_use = 'gpt-3.5-turbo'
  input_prompt = [{'role': 'system', 'content' : 'You are to act as an experienced recruiter. I will give you a job description. Then I will give you the resume. You will then tell me if the candidate is a good match for the role. Then you will score the candidate on a scale of 1-10. 1 being not likely to reach out for an interview, and 10 being that you will reach out for an interview.'},
                  {"role": "assistant", "content" : "Sure, I can do that. Please provide me with the job description and the resume."},
                  {"role": "user", "content" : f'Below this line is the job description:\n{job_description}'},
                  {"role": "assistant", "content" : "Thank you for providing the job description. Please provide me with the candidate's resume"},
                  {"role": "user", "content" : f'Below this line is the resume:\n{resume}'}]
  
  openai.api_key = get_api_key()
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