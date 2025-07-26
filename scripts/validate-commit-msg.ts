#!/usr/bin/env node

import * as fs from 'fs';

const msgPath = process.argv[2];
const msg = fs.readFileSync(msgPath, 'utf-8').trim();

type CommitType =
  | 'Init'
  | 'Feat'
  | 'Chore'
  | 'Style'
  | 'Fix'
  | 'Test'
  | 'Deploy'
  | 'Refactor'
  | 'Rename'
  | 'Docs'
  | 'Remove';

const validTypes: CommitType[] = [
  'Init',
  'Feat',
  'Chore',
  'Style',
  'Fix',
  'Test',
  'Deploy',
  'Refactor',
  'Rename',
  'Docs',
  'Remove'
];

const pattern = new RegExp(`^\\[\\s*#\\d+\\s*\\|\\s*(${validTypes.join('|')})\\s*\\]\\s*.+$`);

if (!pattern.test(msg)) {
  console.log('\n❌ 커밋 메시지 형식이 올바르지 않습니다!');
  console.log('\n올바른 형식: [ #이슈번호 | 타입 ] 커밋메시지');
  console.log('\n예시:');
  console.log('  [ #123 | Feat ] 사용자 로그인 기능 추가');
  console.log('  [ #456 | Fix ] 이미지 업로드 버그 수정');
  console.log('  [ #789 | Docs ] README 파일 업데이트');
  console.log(`\n사용 가능한 타입: ${validTypes.join(', ')}`);
  console.log(`\n현재 커밋 메시지: "${msg}"\n`);
  process.exit(1);
}

console.log('✅ 커밋 메시지 형식이 올바릅니다!');
process.exit(0);
