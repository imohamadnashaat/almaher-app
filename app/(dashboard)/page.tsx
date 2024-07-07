import Button from '../../components/Button';

export default function Home() {
  return (
    <>
      <h1 className="mb-4 text-3xl font-bold text-gray-900">الصفحة الرئيسية</h1>
      <Button label="اختر دورة" redirectTo="/courses/select-course" />
    </>
  );
}
