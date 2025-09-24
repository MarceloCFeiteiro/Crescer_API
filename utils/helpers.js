
import { faker } from "@faker-js/faker";

export async function CreateUserToRegister(body) {

    let modifiedBody = { ...body };

    modifiedBody.email = faker.internet.email({ firstName: 'UserAuto' });
    modifiedBody.password = faker.internet.password({ length: 6 });

    return modifiedBody;
}

export async function getTokenAuthentication(request, user) {

    const body = {
        email: user.email,
        password: user.password
    };

    console.log('Login body:', body);

    const response = await request.post('/auth/login', { data: body });

    console.log('Status:', response.status());
    console.log('URL chamada:', response.url());

    const text = await response.text();
    console.log('Resposta bruta:', text);

    const data = await response.json();
    return data.token;


}
