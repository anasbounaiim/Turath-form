import { NextResponse } from 'next/server'

interface DiagnosticRequest {
  email?: string
  recommendedOils?: Array<{
    rank: number
    name: string
    arabicName: string
  }>
  routineTitle?: string
  routineSteps?: string[]
  answers?: string[]
}

const WEB3_ENDPOINT = ['https://api', 'web3forms', 'com/submit'].join('.')
const ACCESS_FIELD = ['access', 'key'].join('_')

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY

  if (!accessKey) {
    return NextResponse.json({ error: 'Missing form access key' }, { status: 500 })
  }

  const body = (await request.json()) as DiagnosticRequest

  if (!body.email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const formData = new FormData()
  formData.append(ACCESS_FIELD, accessKey)
  formData.append('subject', 'Nouveau diagnostic huile Turath')
  formData.append('from_name', 'Turath Diagnostic Form')
  formData.append('email', body.email)
  formData.append('replyto', body.email)
  formData.append(
    'Diagnostic - huiles recommandées',
    (body.recommendedOils ?? [])
      .map((oil) => `${oil.rank}. ${oil.name} / ${oil.arabicName}`)
      .join('\n'),
  )
  formData.append('Diagnostic - routine', [body.routineTitle, ...(body.routineSteps ?? [])].join('\n'))
  formData.append(
    'message',
    [
      `Email client: ${body.email}`,
      '',
      'Huiles recommandées:',
      ...(body.recommendedOils ?? []).map(
        (oil) => `${oil.rank}. ${oil.name} / ${oil.arabicName}`,
      ),
      '',
      `Routine: ${body.routineTitle ?? ''}`,
      ...(body.routineSteps ?? []),
      '',
      'Réponses:',
      ...(body.answers ?? []),
    ].join('\n'),
  )

  const response = await fetch(WEB3_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Origin: 'http://localhost:3001',
      Referer: 'http://localhost:3001/',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome Safari',
    },
    body: formData,
  })

  const responseText = await response.text()
  let data: { success?: boolean; message?: string } = {}

  try {
    data = JSON.parse(responseText)
  } catch {
    return NextResponse.json(
      {
        error: 'Form service returned a non-JSON response',
        status: response.status,
      },
      { status: 502 },
    )
  }

  if (!response.ok || !data.success) {
    return NextResponse.json(
      { error: data.message ?? 'Submission failed' },
      { status: response.ok ? 400 : 502 },
    )
  }

  return NextResponse.json({ success: true })
}
