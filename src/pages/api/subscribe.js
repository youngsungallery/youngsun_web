import fs from "fs";
import path from "path";

export default function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

    const { kakaoId } = req.body;
    if (!kakaoId) {
        return res.status(400).json({ message: "카카오톡 ID를 입력해주세요!" });
    }

    const filePath = path.join(process.cwd(), "DB", "KakaoID.json");

    try {
        let kakaoData = [];
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, "utf8");
            kakaoData = JSON.parse(fileContent);
        }

        // 중복 체크
        if (kakaoData.some((entry) => entry.kakaoId === kakaoId)) {
            return res.status(409).json({ message: "이미 구독한 카카오톡 ID입니다." });
        }

        // 새로운 ID 추가
        kakaoData.push({ kakaoId, date: new Date().toISOString() });

        fs.writeFileSync(filePath, JSON.stringify(kakaoData, null, 2), "utf8");

        return res.status(200).json({ message: "구독 신청 완료!" });
    } catch (error) {
        console.error("파일 저장 오류:", error);
        return res.status(500).json({ message: "서버 오류 발생", error });
    }
}