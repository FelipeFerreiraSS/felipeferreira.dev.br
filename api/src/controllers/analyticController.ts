import { PrismaClient } from '@prisma/client';
import { FastifyReply, FastifyRequest } from "fastify";

const prisma = new PrismaClient();

// Handler para exibir estatísticas do crm
export const getAnalyticsHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const user = request.user as { userId: number, type: string };
    
    let response = {};
    
    if (user.type === 'admin') {

      const postsPublished = await getPostsPublished()

      const postsDraft = await getPostsDraft()

      const tags = await getTags()

      const topAuthor = await getTopAuthor()

      const images = await getImages()

      const mostRecentPost = await getMostRecentPost()

      const averageReadTime = await getAverageReadTime()

      const postsPerTag = await getPostsPerTag();

      const postsByMonth = await getPostsByMonth();

      response = {
        message: 'Admin analytics',
        postsPublished,
        postsDraft,
        tags,
        topAuthor,
        images,
        mostRecentPost,
        averageReadTime,
        postsPerTag: postsPerTag.map(tag => ({
          idTag: tag.id,
          tagName: tag.name,
          totalPosts: tag._count.posts,
        })),
        postsByMonth
      };
      
    } else {
      const postsPublished = await getPostsPublishedByUser(user.userId)

      const postsDraft = await getPostsDraftByUser(user.userId)

      const tags = await getTags()

      const images = await getImagesByUser(user.userId)

      const mostRecentPost = await getMostRecentPostByUser(user.userId)

      const averageReadTime = await getAverageReadTimeByUser(user.userId)

      const postsPerTag = await getPostsPerTagByUser(user.userId);

      const postsByMonth = await getPostsByMonthByUser(user.userId);

      response = {
        message: 'Editor analytics',
        postsPublished,
        postsDraft,
        tags,
        images,
        mostRecentPost,
        averageReadTime,
        postsPerTag: postsPerTag.map(tag => ({
          idTag: tag.id,
          tagName: tag.name,
          totalPosts: tag._count.posts,
        })),
        postsByMonth
      };
    }

    return reply.status(200).send({ analytics: response })
  } catch (error) {
    console.error('Erro ao obter Analytics:', error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
}

// ####################################################### admin

// todos os posts publicados
export const getPostsPublished = async () => {
  const postsPublished = await prisma.post.count({
    where: { published: true },
  })

  return postsPublished
}

// todos os posts não publicados
export const getPostsDraft = async () => {
  const postsDraft = await prisma.post.count({
    where: { published: false },
  })

  return postsDraft
}

// quantidade de tags
export const getTags = async () => {
  const tags = await prisma.tag.count({})

  return tags
}

// autor com mais posts publicados
export const getTopAuthor = async () => {
  const userWithMostPosts = await prisma.post.groupBy({
    by: ['authorId'],
    where: { published: true },
    _count: { authorId: true },
    orderBy: {
      _count: {
        authorId: 'desc',
      },
    },
    take: 1,
  });
  
  const topAuthor = await prisma.user.findUnique({
    where: { id: userWithMostPosts[0].authorId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      // posts: {
      //   where: { published: true },
      //   select: { id: true, title: true },
      // },
    },
  });

  return {
    ...topAuthor,
    postsPublished: userWithMostPosts[0]._count.authorId,
  };
}

// quantidade de imagens
export const getImages = async () => {
  const images = await prisma.image.count({})

  return images
}

// post mais recente
export const getMostRecentPost = async () => {
  const mostRecentPost = await prisma.post.findFirst({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      summary: true,
      createdAt: true,
      headerImage: {
        select: {
          id: true,
          imageUrl: true,
        },
      },
    },
  });

  return mostRecentPost
}

// media de tempo de leitura de um post
export const getAverageReadTime = async () => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: {
      readTime: true,
    },
  });
  
  const totalReadTime = posts.reduce((total, post) => {
    const readTimeInMinutes = post.readTime ? parseInt(post.readTime, 10) : 0
    return total + (isNaN(readTimeInMinutes) ? 0 : readTimeInMinutes);
  }, 0);
  
  const averageReadTime = totalReadTime / posts.length;
  const minutes = Math.floor(averageReadTime);
  const seconds = Math.round((averageReadTime - minutes) * 60); 

  return `${minutes}:${seconds}`
}

// todos os posts por tag
export const getPostsPerTag = async () => {
  const postsPerTag = await prisma.tag.findMany({
    select: {
      id: true,
      name: true,
      _count: {
        select: { posts: true },
      },
    },
  });

  return postsPerTag
}

// ordena os posts criados em ordem decrescente
export const getPostsByMonth = async () => {
  const postsByMonth = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      createdAt: true,
      published: true
    },
  });

  return postsByMonth
}

// ####################################################### editor

// todos os posts publicados por o usuário logado
export const getPostsPublishedByUser = async (id: number) => {
  const postsPublishedByUser = await prisma.post.count({
    where: { published: true, authorId: id },
  })

  return postsPublishedByUser
}

// todos os posts publicados por o usuário logado
export const getPostsDraftByUser = async (id: number) => {
  const postsDraftByUser = await prisma.post.count({
    where: { published: false, authorId: id },
  })

  return postsDraftByUser
}

// quantidade de imagens do usário logado
export const getImagesByUser = async (id: number) => {
  const images = await prisma.image.count({
    where: { uploadedById: id }
  })

  return images
}


// post mais recente do usário logado
export const getMostRecentPostByUser = async (id: number) => {
  const mostRecentPost = await prisma.post.findFirst({
    where: { published: true, authorId: id },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      summary: true,
      createdAt: true,
      headerImage: {
        select: {
          id: true,
          imageUrl: true,
        },
      },
    },
  });

  return mostRecentPost
}

// media de tempo de leitura de um post do usário logado
export const getAverageReadTimeByUser = async (id: number) => {
  const posts = await prisma.post.findMany({
    where: { published: true, authorId: id },
    select: {
      readTime: true,
    },
  });

  if (posts.length === 0) {
    // Se o usuário não tem posts, retorna "00:00"
    return "00:00";
  }
  
  const totalReadTime = posts.reduce((total, post) => {
    const readTimeInMinutes = post.readTime ? parseInt(post.readTime, 10) : 0
    return total + (isNaN(readTimeInMinutes) ? 0 : readTimeInMinutes);
  }, 0);
  
  const averageReadTime = totalReadTime / posts.length;

  if (isNaN(averageReadTime)) {
    // Se a média for NaN, retorna "00:00"
    return "00:00";
  }
  
  const minutes = Math.floor(averageReadTime);
  const seconds = Math.round((averageReadTime - minutes) * 60); 

  return `${minutes}:${seconds}`
}

// todos os posts por tag do usário logado
export const getPostsPerTagByUser = async (id: number) => {
  const postsPerTag = await prisma.tag.findMany({
    where: {
      posts: {
        some: {
          authorId: id
        }
      }
    },
    select: {
      id: true,
      name: true,
      _count: {
        select: { posts: true },
      },
    },
  });

  return postsPerTag
}

// ordena os posts criados em ordem decrescente do usário logado
export const getPostsByMonthByUser = async (id: number) => {
  const postsByMonth = await prisma.post.findMany({
    where: { authorId: id },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      createdAt: true,
      published: true
    },
  });

  return postsByMonth
}
