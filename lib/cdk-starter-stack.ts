import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cdk from 'aws-cdk-lib';
import * as path from 'path';

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new apigateway.RestApi(this, 'api', {
      description: 'example api gateway',
      deployOptions: {
        stageName: 'dev',
      },
      // 👇 enable CORS
      defaultCorsPreflightOptions: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowCredentials: true,
        allowOrigins: ['http://localhost:3000'],
      },
    });

    // 👇 create an Output for the API URL
    new cdk.CfnOutput(this, 'apiUrl', {value: api.url});

    // 👇 define get filters function
    const getfiltersLambda = new lambda.Function(this, 'get-filters-lambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.main',
      code: lambda.Code.fromAsset(path.join(__dirname, '/../src/get-filters')),
    });

    // 👇 add a /filters resource
    const filters = api.root.addResource('filters');

    // 👇 integrate GET /filters with getfiltersLambda
    filters.addMethod(
      'GET',
      new apigateway.LambdaIntegration(getfiltersLambda, {proxy: true}),
    );

    // 👇 define delete filter function
    const deletefilterLambda = new lambda.Function(this, 'delete-filter-lambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.main',
      code: lambda.Code.fromAsset(path.join(__dirname, '/../src/delete-filter')),
    });

    // 👇 add a /filters/{filterId} resource
    const filter = filters.addResource('{filterId}');

    // 👇 integrate DELETE /filters/{filterId} with deletefiltersLambda
    filter.addMethod(
      'DELETE',
      new apigateway.LambdaIntegration(deletefilterLambda),
    );
  }
}
