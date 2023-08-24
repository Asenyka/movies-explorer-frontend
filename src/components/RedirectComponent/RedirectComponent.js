import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function RedirectComponent() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/", { replace: true });
  });
}
