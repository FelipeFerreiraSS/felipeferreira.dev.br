type FormErrorMessageProps = {
  error?: string;
};

export default function FormErrorMessage(props: FormErrorMessageProps) {
  const { error } = props
  if (!error) return null;
  
  return (
    <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
      {error}
    </p>
  )
}