# AWS Amplify Gen2 × Next.js サンプルアプリケーション

このリポジトリは、AWS Amplify Gen2のNext.js (App Router) スターターテンプレートをベースに作成されたサンプルアプリケーションです。MESCIUS開発者ブログで紹介したコードをベースに、認証、API、データベース機能を簡単にセットアップできるように構成されています。

## 概要

このアプリケーションは、AWS Amplify Gen2のNext.js (App Router) スターターテンプレートをベースとし、AWS Amplify Gen2と統合されたNext.jsアプリケーションで、スケーラビリティとパフォーマンスを重視して構築されています。AWS Cognito、AppSync、DynamoDBなどの事前設定されたAWSサービスでプロジェクトを素早く開始したい開発者に最適です。

## 関連ブログ記事

このコードベースは以下のMESCIUS開発者ブログ記事で紹介されています：

1. **[LambdaもDynamoDBもコードから実装可能？AWS Amplify Gen2を使ってみた](https://devlog.mescius.jp/amplifygen2-quickstart/)**
   - AWS Amplify Gen2の基本的な使い方とLambda、DynamoDBの実装方法

2. **[AWSわからなくても動くやつ、できました。Wijmo×Amplify Gen2](https://devlog.mescius.jp/amplifygen2-wijmo-crudapp/)**
   - WijmoコンポーネントとAmplify Gen2を組み合わせたCRUDアプリケーションの実装

3. **[GraphQL？Amplify Gen2で生成されたGraphQL APIとActiveReportsJSでサクッと帳票](https://devlog.mescius.jp/amplifygen2-activereportsjs/)**
   - GraphQL APIとActiveReportsJSを使った帳票生成機能の実装

## 機能

- **認証**: Amazon Cognitoによる安全なユーザー認証
- **API**: AWS AppSyncを使用したGraphQLエンドポイント
- **データベース**: Amazon DynamoDBによるリアルタイムデータベース
- **データグリッド**: Wijmo FlexGridによるインタラクティブなデータ表示・編集
- **帳票生成**: ActiveReportsJSによる高機能な帳票作成
- **API仕様書**: Swagger UIによるAPI仕様の可視化

## AWSへのデプロイ

アプリケーションのデプロイに関する詳細な手順については、[デプロイメントセクション](https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/#deploy-a-fullstack-app-to-aws)のドキュメントを参照してください。

## 重要な注意事項

### MESCIUSライブラリのライセンスについて

このリポジトリでは、以下のMESCIUS製JavaScriptライブラリを使用しています：

- **Wijmo**: インタラクティブなデータグリッドとUIコンポーネント
- **ActiveReportsJS**: 高機能な帳票生成ライブラリ

これらのライブラリは商用ライセンスが必要です。本番環境で使用する場合は、適切なライセンスを取得してください。

- [Wijmoライセンス情報](https://developer.mescius.jp/wijmo#license)
- [ActiveReportsJSライセンス情報](https://developer.mescius.jp/activereportsjs#license)

## セキュリティ

詳細については、[CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications)を参照してください。

## ライセンス

このライブラリはMIT-0ライセンスの下でライセンスされています。LICENSEファイルを参照してください。
