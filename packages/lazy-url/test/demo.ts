/**
 * Created by user on 2019/6/10.
 */

// @ts-ignore
import LazyURL from 'lazy-url';

let a1 = 'https://gitee.com/api/v5/';
let a2 = '/api/v5/repos/xxxx/xxxx/contents';

let u = new LazyURL(a2, a1);

console.dir(u.toRealString());
// => 'https://gitee.com/api/v5/repos/xxxx/xxxx/contents'

// @ts-ignore
u = new URL(a2, a1);

console.dir(u.toString());
// => 'https://gitee.com/api/v5/repos/xxxx/xxxx/contents'

a1 = '/api/v5/';
a2 = '/api/v5/repos/xxxx/xxxx/contents';

u = new LazyURL(a2, a1);
// => '/api/v5/repos/xxxx/xxxx/contents'

console.dir(u.toRealString());

console.dir(new URL(u).toString());

// @ts-ignore
u = new URL(a2, a1);
// => throw error

console.dir(u.toString());


