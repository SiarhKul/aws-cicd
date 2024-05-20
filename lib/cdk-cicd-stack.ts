import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {CodePipeline, CodePipelineSource, ShellStep} from "aws-cdk-lib/pipelines";
import {PipelineStages} from "./PipelineStages";

export class CdkCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'AwesomePipeline', {
      pipelineName: 'AwesomePipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource
          .gitHub('SiarhKul/aws-cicd', 'main'),
        commands: [
          'npm ci',
          'npx cdk synth',
          'ls -al',  // List all files in the current directory
          'ls -al cdk.out'  // List all files in the cdk.out directory
        ],
        primaryOutputDirectory: 'cdk.out'
      })
    })

    pipeline.addStage(new PipelineStages(this, 'PipelineTestStage', {
      stageName: 'test'
    }))
  }
}
