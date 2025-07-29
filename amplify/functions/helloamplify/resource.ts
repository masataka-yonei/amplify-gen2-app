import { defineFunction } from '@aws-amplify/backend';

export const helloAmplify = defineFunction({
　// オプションで関数の名前を指定できます（デフォルトはディレクトリ名です）
  name: 'hello-amplify',
// オプションでハンドラーのパスを指定できます（デフォルトは "./handler.ts" です）
  entry: './handler.ts'
});