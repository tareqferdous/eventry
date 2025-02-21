const EmailTemplate = ({ message }) => {
  return (
    <div className="max-w-md mx-auto border border-gray-300 rounded-lg shadow-md p-4 bg-gray-50">
      <p className="text-gray-700 bg-white p-3 rounded-md border border-gray-200">
        {message}
      </p>
    </div>
  );
};

export default EmailTemplate;
