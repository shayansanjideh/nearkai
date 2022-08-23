import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export const useNavigation = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      const allElements = document.querySelectorAll('.nav-selectable');
      if (e.key === 'Backspace') {
        navigate(-1);
      } else if (e.key === 'ArrowUp') {
        setSelectedIndex((idx) => Math.max(idx - 1, 0));
      } else if (e.key === 'ArrowDown') {
        setSelectedIndex((idx) => Math.min(idx + 1, allElements.length - 1));
      } else if (e.key === 'Enter') {
        allElements.item(selectedIndex).click();
      }
    });
  }, []);

  useEffect(() => {
    const allElements = document.querySelectorAll('.nav-selectable');
    allElements.forEach((element, idx) => {
      if (idx !== selectedIndex) {
        element.blur();
      } else {
        element.focus();
      }
    });
  }, [selectedIndex]);
};
