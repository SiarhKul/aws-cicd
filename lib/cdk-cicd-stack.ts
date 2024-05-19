import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {CodePipeline, CodePipelineSource, ShellStep} from "aws-cdk-lib/pipelines";

export class CdkCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const source = CodePipelineSource
      .gitHub('SiarhKul/aws-cicd', 'main');

    new CodePipeline(this, 'AwesomePipeline', {
      publishAssetsInParallel: false,
      pipelineName: 'AwesomePipeline',
      synth: new ShellStep('Synth', {
        input: source,
        commands: [
          'npm ci',
          'ls',
          'npx cdk synth',
          'ls -al',  // List all files in the current directory
          'ls -al cdk.out'  // List all files in the cdk.out directory
        ],
        primaryOutputDirectory: 'cdk.out'
      })
    })
  }
}
