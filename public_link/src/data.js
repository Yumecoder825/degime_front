

const noContactList=[{"url":"/image/avatar/avatar-1.png", "username":"Dodo", "email":"dodo@gmail.com", "is_new":true}, 
                    {"url":"/image/avatar/avatar-2.png", "username":"Koko", "email":"koko@gmail.com", "is_new":false},
                    {"url":"/image/avatar/avatar-3.png", "username":"Tete", "email":"tete@gmail.com", "is_new":true}];
const deletedList=[{"url":"/image/avatar/avatar-4.png", "username":"Anna", "email":"anna@gmail.com", "is_new":false}, 
                    {"url":"/image/avatar/avatar-5.png", "username":"Haruko", "email":"haruko@gmail.com", "is_new":false},
                    {"url":"/image/avatar/avatar-6.png", "username":"Nana", "email":"nana@gmail.com", "is_new":true}];
const blockList=[{"url":"/image/avatar/avatar-7.png", "username":"Roro", "email":"roro@gmail.com", "is_new":false}, 
                    {"url":"/image/avatar/avatar-8.png", "username":"Mama", "email":"mama@gmail.com", "is_new":true},
                    {"url":"/image/avatar/avatar-9.png", "username":"Haha", "email":"haha@gmail.com", "is_new":false}];
const pendingList=[{"url":"/image/avatar/avatar-7.png", "username":"日向", "date": "2019/05/19", "content":"あなたにチャットを求めています。", "is_online":0}, 
                    {"url":"/image/avatar/avatar-8.png", "username":"イタチ", "date": "2019/05/19", "content":"スーパー、ありがとう", "is_online":2},
                    {"url":"/image/avatar/avatar-9.png", "username":"シスイ", "date": "2019/05/19", "content":"コロナウイルスはどうですか？", "is_online":1}];
const acceptedList=[{"url":"/image/avatar/avatar-7.png", "username":"ジライヤ", "date": "2019/05/19", "content":"jarek.kowal@emaile.com", "is_online":1}, 
                    {"url":"/image/avatar/avatar-8.png", "username":"あおい", "date": "2019/05/19", "content":"ありがとございます。", "is_online":0},
                    {"url":"/image/avatar/avatar-9.png", "username":"けお", "date": "2019/05/19", "content":"ありがとございます。", "is_online":2},
                    {"url":"/image/avatar/avatar-7.png", "username":"ジライヤ", "date": "2019/05/19", "content":"jarek.kowal@emaile.com", "is_online":1}, 
                    {"url":"/image/avatar/avatar-8.png", "username":"あおい", "date": "2019/05/19", "content":"ありがとございます。", "is_online":0},
                    {"url":"/image/avatar/avatar-9.png", "username":"けお", "date": "2019/05/19", "content":"ありがとございます。", "is_online":2},
                    {"url":"/image/avatar/avatar-7.png", "username":"ジライヤ", "date": "2019/05/19", "content":"jarek.kowal@emaile.com", "is_online":1}, 
                    {"url":"/image/avatar/avatar-8.png", "username":"あおい", "date": "2019/05/19", "content":"ありがとございます。", "is_online":0},
                    {"url":"/image/avatar/avatar-9.png", "username":"けお", "date": "2019/05/19", "content":"ありがとございます。", "is_online":2},
                    {"url":"/image/avatar/avatar-7.png", "username":"ジライヤ", "date": "2019/05/19", "content":"jarek.kowal@emaile.com", "is_online":1}, 
                    {"url":"/image/avatar/avatar-8.png", "username":"あおい", "date": "2019/05/19", "content":"ありがとございます。", "is_online":0},
                    {"url":"/image/avatar/avatar-9.png", "username":"けお", "date": "2019/05/19", "content":"ありがとございます。", "is_online":2}
                  ];
const profileButton=[{"type":"link", "placeholder":"リンク追加"},
                     {"type":"oneImage", "placeholder":"1面画像リンク追加"},
                     {"type":"twoImage", "placeholder":"2面画像リンク追加"},
                     {"type":"threeImage", "placeholder":"3面画像リンク追加"},
                     {"type":"fourImage", "placeholder":"4面画像リンク追加"},
                     {"type":"videoLink", "placeholder":"動画リンク追加"},
                     {"type":"text", "placeholder":"テキスト追加"},
                     {"type":"map", "placeholder":"マップ追加"},
                     {"type":"space", "placeholder":"余白追加"},
                     {"type":"selfProfile", "placeholder":"自己プロファイル追加"},
                     {"type":"slideImage", "placeholder":"スライド画像追加"}
                    ]


export {noContactList, deletedList, blockList, profileButton, pendingList, acceptedList}