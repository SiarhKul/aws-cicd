import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {CodePipeline, CodePipelineSource, ShellStep} from "aws-cdk-lib/pipelines";

export class CdkCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

/*    new CodePipeline(this, 'AwesomePipeline', {
      pipelineName: 'AwesomePipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('SiarhKul/aws-cicd', 'main'),
        commands:[
          'npm ci',
          'npx cdk synth'
        ]
      })

    })*/

    new CodePipeline(this, 'AwesomePipeline', {
      pipelineName: 'AwesomePipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('SiarhKul/aws-cicd', 'main'),
        commands: [
          'npm ci',
          'npx cdk synth'
        ],
      })
    })
  }
}
