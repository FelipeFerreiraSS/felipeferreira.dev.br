import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'
import { customAlphabet } from 'nanoid'

export const runtime = 'edge'

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
) // 7-character random string
export default async function handler(req: Request) {
  if (req.method === 'POST') {
    const file = await req.blob();
    const contentType = req.headers.get('content-type');

    if (!contentType || !contentType.startsWith('image/')) {
      return NextResponse.json({ error: 'Apenas arquivos de imagem são permitidos' }, { status: 400 });
    }

    const extension = contentType.split('/')[1];
    const filename = `${nanoid()}.${extension}`;

    const blob = await put(filename, file, {
      contentType,
      access: 'public',
    });
  return NextResponse.json(blob)
  } else {
    return NextResponse.json({ error: 'Método não permitido' }, { status: 405 });
  }
}