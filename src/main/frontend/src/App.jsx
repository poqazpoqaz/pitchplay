import Dropdown from "./components/Dropdown";
import { useState } from "react";


function App() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };

  const options = ["Option 1", "Optionasdasdasdasdasdasdasdasdasdasdasdasdsasdasdasdlknalkvnadflkvjsdnflkvnsdvkjsdfnvlisdjfnvlskjdfvn2", "Option 3", "Option 4"];

  return (
    <div style={{ padding: "50px" }}>
      {/* 드롭다운 컴포넌트 사용 */}
      <Dropdown
        options={options}        // 드롭다운 옵션 목록
        selected={selectedOption} // 선택된 항목
        onChange={handleSelectChange} // 선택 시 상태 업데이트 함수
        text="지역선택"
      />
    </div>
  );
}

export default App;