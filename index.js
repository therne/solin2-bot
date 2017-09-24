// Check: https://github.com/plusfriend/auto_reply
const Mansion = require('mansion');

const log = Mansion.Logger;
const app = Mansion.classic();
app.use(async (ctx, next) => {
    await next();
    ctx.type = 'application/json; charset=utf-8';
});

/**
 * GET /keyboard
 * 사용자가 처음으로 채팅방에 들어올때 호출됨. 최초 선택지를 줄 수 있다.
 */
app.get('/keyboard', async ctx => {
    return {
        type: 'buttons',
        buttons: [
            '안녕, 넌 참 다른 일을 하는구나.',
            '안녕, 제발 꺼져줄래?',
        ]
    };
});

app.post('/message', async ctx => {
    const { user_key, type, content } = ctx.body;
    log(`User ${user_key} sent ${type} : ${content}`);

    if (type === 'text' && content.includes('안녕')) {
        return { message: { text: '나도 안녕!' } };
    } else if (type === 'text' && content.includes('시발')) {
        return { message: { text: '시발' } };
    }
    return {
        message: {
            text: `${content} 할일이 등록되었어요!`,
        },
        message_button: {
            label: 'Solin에서 보기',
            url: 'http://therne.me/'
        }
    }
});

app.listen(6974);

