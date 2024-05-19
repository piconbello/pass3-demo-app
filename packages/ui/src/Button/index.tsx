export function Button(props: {
  onClick: () => void;
  children: React.ReactNode;
}): JSX.Element {
  const { children, onClick } = props;
  return (
    <button
      onClick={onClick}
      style={{
        background: 'black',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1.25rem',
        borderRadius: '0.25rem',
        display: 'inline-block',
        cursor: 'pointer',
        fontSize: '1rem',
      }}
      type='button'
    >
      {children}
    </button>
  );
}
