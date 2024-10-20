import React from 'react';
import { downloadFile } from '../app/lib/api';
import toast from 'react-hot-toast';

interface DownloadButtonProps {
  endpoint: string;
  params?: Record<string, any>;
  filename: string;
  label: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  endpoint,
  params,
  filename,
  label,
}) => {
  const handleDownload = async () => {
    try {
      const blob = await downloadFile(endpoint, params);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error('حدث خطأ أثناء تنزيل الملف', {
        duration: 4000,
      });
      console.error('Download failed:', error);
    }
  };

  return (
    <button
      className="bg-blue-500 text-white p-2 mb-4 rounded-lg hover:bg-blue-700 transition-colors mx-2"
      onClick={handleDownload}
    >
      {label}
    </button>
  );
};

export default DownloadButton;
