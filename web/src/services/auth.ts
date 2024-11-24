import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';

export const authenticateUser = async (ctx: GetServerSidePropsContext) => {
  const { ['felipeferreirablog.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const decodedToken = jwt.decode(token) as { exp?: number };

    if (decodedToken?.exp && Date.now() >= decodedToken.exp * 1000) {
      return {
        redirect: {
          destination: '/login?error=expired_token',
          permanent: false,
        },
      };
    }
  } catch (error) {
    console.error('Erro ao verificar o token:', error);

    return {
      redirect: {
        destination: '/login?error=token_error',
        permanent: false,
      },
    };
  }

  try {
    const secretKey = process.env.SECRET_KEY_JWT as string;
    const decodedToken = jwt.verify(token, secretKey) as { type: string };

    if (decodedToken.type === 'admin') {
      return {
        props: {
          userType: 'admin',
        },
      };
    } else if (decodedToken.type === 'editor') {
      return {
        props: {
          userType: 'editor',
        },
      };
    } else {
      // Caso o tipo de usuário não seja reconhecido, redirecione para o login
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  } catch (error) {
    // Se o token for inválido ou não puder ser verificado
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};
