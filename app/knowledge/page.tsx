"use client";

import Link from "next/link";
import { useLang } from "../context/LanguageContext";
import LangToggle from "../components/LangToggle";

const articlesData = {
  en: [
    {
      id: 1, category: "Foundation", color: "#c9a96e", readTime: "4 min",
      title: "Why Most Personality Tests Miss the Point",
      summary: "MBTI, DISC, and similar tests give you a label. But you are not a label. Here's why adaptive conversation reveals what static tests can't.",
      sources: [
        { label: "Pittenger, D.J. (2005). Cautionary Comments Regarding the Myers-Briggs Type Indicator. Wiley", url: "https://compass.onlinelibrary.wiley.com/doi/abs/10.1111/spc3.12434" },
        { label: "Boyle, G.J. (1995). Myers-Briggs Type Indicator — Some Psychometric Limitations. ResearchGate", url: "https://www.researchgate.net/publication/27827048_Myers-Briggs_Type_Indicator_MBTI_Some_psychometric_limitations" },
      ],
      content: [
        "Personality tests like MBTI were designed for convenience, not depth. They work by presenting you with binary choices and mapping your responses to pre-existing categories. The problem: people are not binary, and our responses are heavily influenced by how we feel that day, what we think we should answer, and what we wish were true about ourselves.",
        "Research in psychology consistently shows that MBTI results can change significantly for the same person over time. This isn't because people change drastically — it's because the instrument isn't capturing something stable. It's capturing a snapshot of your self-perception on one particular day.",
        "What actually predicts life satisfaction, career success, and meaningful relationships are deeper things: your core values, the types of problems that energize you, how you relate to autonomy and structure, and what you consider a good use of your finite time on earth. These require conversation, not checkboxes.",
      ]
    },
    {
      id: 2, category: "Framework", color: "#8b6fae", readTime: "5 min",
      title: "Understanding Ikigai: Your Intersection of Purpose",
      summary: "The Japanese concept of Ikigai sits at the intersection of four questions. Understanding each one is the first step to finding your direction.",
      sources: [
        { label: "Kumano, M. (2017). On the Concept of Well-Being in Japan. ResearchGate", url: "https://www.researchgate.net/publication/317206800_On_the_Concept_of_Well-Being_in_Japan_Feeling_Shiawase_as_Hedonic_Well-Being_and_Feeling_Ikigai_as_Eudaimonic_Well-Being" },
        { label: "Imai, T. et al. (2022). Ikigai and subsequent health and wellbeing. PubMed/NIH", url: "https://pubmed.ncbi.nlm.nih.gov/35141667/" },
      ],
      content: [
        "Ikigai (生き甲斐) is a Japanese concept meaning 'reason for being.' It lives at the intersection of four elements: what you love, what you're good at, what the world needs, and what you can be paid for. When all four overlap, that's your Ikigai.",
        "Most people live fully in one or two zones. A skilled professional who earns well but doesn't care about the impact of their work. A passionate volunteer who loves their cause but can't sustain themselves financially. The goal isn't perfection across all four immediately — it's awareness of where you are and intentional movement toward better alignment.",
        "The most important step is honesty. Most people answer 'what you love' with what they think sounds good, rather than what actually gives them energy. Pay attention to the activities where you lose track of time, where you feel genuinely alive, where you'd do the work even without recognition. That's your signal.",
      ]
    },
    {
      id: 3, category: "Psychology", color: "#6b9bb8", readTime: "5 min",
      title: "Values Clarification: What You Actually Believe",
      summary: "Your stated values and your lived values are often different. This gap is one of the most common sources of life dissatisfaction.",
      sources: [
        { label: "Hayes, S.C. et al. (2012). Acceptance and Commitment Therapy. ResearchGate", url: "https://www.researchgate.net/publication/258192200_Acceptance_and_Commitment_Therapy_as_a_Unified_Model_of_Behavior_Change" },
        { label: "Dougher, M.J. (2009). Beyond Values Clarification. PMC/NIH", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2686993/" },
      ],
      content: [
        "Ask most people what they value and they'll say things like family, integrity, growth. Ask them how they spent their last 30 days and the picture often looks different. This gap between aspirational values and lived values is one of the most underexplored sources of dissatisfaction.",
        "Values clarification is not about judging yourself. It's about getting honest about what you actually prioritize through your actions, not your ideals. Once you see the gap clearly, you have a choice: change your actions, or acknowledge that what you thought you valued isn't actually a core value for you — and that's okay too.",
        "Some values only emerge under pressure. You might not know how much you value autonomy until you've worked in a controlling environment. You might not know how much you value security until you've experienced real financial uncertainty. These experiences are data, not failures.",
      ]
    },
    {
      id: 4, category: "Deep Work", color: "#c9a96e", readTime: "4 min",
      title: "The Difference Between Being Busy and Being Alive",
      summary: "Productivity culture has convinced many of us that busyness equals worth. The cost of this confusion is often our actual life.",
      sources: [
        { label: "Newport, C. (2016). Deep Work: Rules for Focused Success in a Distracted World. Grand Central Publishing", url: "https://calnewport.com/deep-work-rules-for-focused-success-in-a-distracted-world/" },
        { label: "Review: Deep Work by Cal Newport. SAGE Journals", url: "https://journals.sagepub.com/doi/10.1177/0256090917753047" },
      ],
      content: [
        "There's a particular kind of exhaustion that comes not from working too hard, but from working on the wrong things. You can be completely depleted by work that doesn't matter to you, and still feel energized after a long day of work that does. The difference isn't the hours — it's the alignment.",
        "Being alive, in the deepest sense, means regularly engaging with things that feel genuinely meaningful. Not every task needs to be transcendent, but if your whole life is tasks that mean nothing to you, the emptiness accumulates.",
        "The most important question isn't 'what should I do with my life?' — it's 'what do I keep coming back to, even when no one is watching?' The answer to that question is more honest than any career quiz.",
      ]
    },
    {
      id: 5, category: "Self-Knowledge", color: "#8b6fae", readTime: "6 min",
      title: "Your Blind Spots: What You Can't See About Yourself",
      summary: "Every person has a gap between who they think they are and who they actually are. Knowing this gap exists is itself a form of wisdom.",
      sources: [
        { label: "Luft, J. & Ingham, H. (1955). The Johari Window. ResearchGate", url: "https://www.researchgate.net/figure/The-Johari-Window-Luft-and-Ingham-1955-The-Open-domain-represents-those-aspects-of_fig1_29810621" },
        { label: "Positive Psychology — How to Use The Johari Window for Leadership", url: "https://positivepsychology.com/johari-window/" },
      ],
      content: [
        "The Johari Window, developed by psychologists Joseph Luft and Harrington Ingham in 1955, divides self-knowledge into four areas: what's known to you and others (open), what's known only to you (hidden), what's known only to others (blind spots), and what neither you nor others know (unknown).",
        "Blind spots are things others notice about you that you genuinely can't see. You might think you're being direct when others experience you as harsh. You might think you're being humble when others see you as self-deprecating. These gaps matter because they affect how your relationships actually work, regardless of your intentions.",
        "The way to access blind spots isn't to ask 'what are my blind spots?' — nobody knows the answer to that. It's to ask people who know you well: 'When have I frustrated you? What do I do that seems to work against what I say I want?' Their answers, even if uncomfortable, are gold.",
      ]
    },
  ],
  id: [
    {
      id: 1, category: "Dasar", color: "#c9a96e", readTime: "4 menit",
      title: "Mengapa Kebanyakan Tes Kepribadian Meleset",
      summary: "MBTI, DISC, dan tes serupa memberikan label. Tapi kamu bukan sebuah label. Inilah mengapa percakapan adaptif mengungkap hal yang tidak bisa ditemukan tes statis.",
      sources: [
        { label: "Pittenger, D.J. (2005). Cautionary Comments Regarding the Myers-Briggs Type Indicator. Wiley", url: "https://compass.onlinelibrary.wiley.com/doi/abs/10.1111/spc3.12434" },
        { label: "Boyle, G.J. (1995). Myers-Briggs Type Indicator — Some Psychometric Limitations. ResearchGate", url: "https://www.researchgate.net/publication/27827048_Myers-Briggs_Type_Indicator_MBTI_Some_psychometric_limitations" },
      ],
      content: [
        "Tes kepribadian seperti MBTI dirancang untuk kemudahan, bukan kedalaman. Cara kerjanya adalah menyajikan pilihan biner dan memetakan respons ke kategori yang sudah ada. Masalahnya: orang tidak bersifat biner, dan respons kita sangat dipengaruhi oleh perasaan di hari itu, apa yang kita pikir seharusnya kita jawab, dan apa yang ingin kita yakini tentang diri sendiri.",
        "Penelitian secara konsisten menunjukkan bahwa hasil MBTI dapat berubah secara signifikan untuk orang yang sama dalam kurun waktu berbeda. Ini bukan karena orang berubah drastis — melainkan karena instrumen tersebut tidak menangkap sesuatu yang stabil. Ia hanya menangkap snapshot persepsi diri pada satu hari tertentu.",
        "Yang sebenarnya memprediksi kepuasan hidup, keberhasilan karir, dan hubungan bermakna adalah hal-hal yang lebih dalam: nilai inti, jenis masalah yang memberi energi, hubungan dengan otonomi dan struktur, dan apa yang kamu anggap sebagai penggunaan waktu terbaikmu. Semua itu membutuhkan percakapan, bukan kotak centang.",
      ]
    },
    {
      id: 2, category: "Framework", color: "#8b6fae", readTime: "5 menit",
      title: "Memahami Ikigai: Persimpangan Tujuan Hidupmu",
      summary: "Konsep Ikigai dari Jepang terletak di persimpangan empat pertanyaan. Memahami masing-masing adalah langkah pertama untuk menemukan arahmu.",
      sources: [
        { label: "Kumano, M. (2017). On the Concept of Well-Being in Japan. ResearchGate", url: "https://www.researchgate.net/publication/317206800_On_the_Concept_of_Well-Being_in_Japan_Feeling_Shiawase_as_Hedonic_Well-Being_and_Feeling_Ikigai_as_Eudaimonic_Well-Being" },
        { label: "Imai, T. et al. (2022). Ikigai and subsequent health and wellbeing. PubMed/NIH", url: "https://pubmed.ncbi.nlm.nih.gov/35141667/" },
      ],
      content: [
        "Ikigai (生き甲斐) adalah konsep Jepang yang berarti 'alasan untuk hidup.' Ia berada di persimpangan empat elemen: apa yang kamu cintai, apa yang kamu kuasai, apa yang dibutuhkan dunia, dan apa yang bisa menghasilkan uang. Ketika keempatnya bertemu, itulah Ikigai-mu.",
        "Sebagian besar orang hanya hidup di satu atau dua zona. Profesional terampil yang berpenghasilan baik tapi tidak peduli pada dampak pekerjaannya. Relawan bersemangat yang mencintai tujuannya tapi tidak bisa menopang diri sendiri secara finansial. Tujuannya bukan kesempurnaan di keempat area — melainkan kesadaran tentang posisimu saat ini.",
        "Langkah paling penting adalah kejujuran. Kebanyakan orang menjawab 'apa yang kamu cintai' dengan apa yang terdengar bagus, bukan apa yang sebenarnya memberi mereka energi. Perhatikan aktivitas di mana kamu kehilangan rasa waktu, di mana kamu merasa benar-benar hidup. Itu sinyalmu.",
      ]
    },
    {
      id: 3, category: "Psikologi", color: "#6b9bb8", readTime: "5 menit",
      title: "Values Clarification: Apa yang Sebenarnya Kamu Percaya",
      summary: "Nilai yang kamu nyatakan dan nilai yang kamu jalani seringkali berbeda. Kesenjangan ini adalah salah satu sumber ketidakpuasan hidup yang paling umum.",
      sources: [
        { label: "Hayes, S.C. et al. (2012). Acceptance and Commitment Therapy. ResearchGate", url: "https://www.researchgate.net/publication/258192200_Acceptance_and_Commitment_Therapy_as_a_Unified_Model_of_Behavior_Change" },
        { label: "Dougher, M.J. (2009). Beyond Values Clarification. PMC/NIH", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2686993/" },
      ],
      content: [
        "Tanya sebagian besar orang apa yang mereka hargai dan mereka akan menyebut hal-hal seperti keluarga, integritas, pertumbuhan. Tanya bagaimana mereka menghabiskan 30 hari terakhir — dan gambarannya sering berbeda. Kesenjangan antara nilai aspirasional dan nilai yang dijalani adalah salah satu sumber ketidakpuasan yang paling jarang dieksplorasi.",
        "Klarifikasi nilai bukan tentang menghakimi diri sendiri. Ini tentang jujur mengenai apa yang sebenarnya kamu prioritaskan melalui tindakanmu, bukan idealmu. Begitu kamu melihat kesenjangan ini dengan jelas, kamu punya pilihan: ubah tindakanmu, atau akui bahwa apa yang kamu kira kamu hargai sebenarnya bukan nilai inti bagimu — dan itu pun tidak masalah.",
        "Beberapa nilai hanya muncul di bawah tekanan. Kamu mungkin tidak tahu betapa kamu menghargai otonomi sampai kamu bekerja di lingkungan yang kontrolnya ketat. Pengalaman-pengalaman ini adalah data, bukan kegagalan.",
      ]
    },
    {
      id: 4, category: "Deep Work", color: "#c9a96e", readTime: "4 menit",
      title: "Perbedaan Antara Sibuk dan Benar-Benar Hidup",
      summary: "Budaya produktivitas telah meyakinkan banyak dari kita bahwa kesibukan sama dengan nilai diri. Biaya dari kebingungan ini seringkali adalah kehidupan kita yang sebenarnya.",
      sources: [
        { label: "Newport, C. (2016). Deep Work: Rules for Focused Success in a Distracted World. Grand Central Publishing", url: "https://calnewport.com/deep-work-rules-for-focused-success-in-a-distracted-world/" },
        { label: "Review: Deep Work by Cal Newport. SAGE Journals", url: "https://journals.sagepub.com/doi/10.1177/0256090917753047" },
      ],
      content: [
        "Ada kelelahan tertentu yang datang bukan dari bekerja terlalu keras, tetapi dari bekerja pada hal yang salah. Kamu bisa benar-benar terkuras oleh pekerjaan yang tidak berarti bagimu, namun tetap merasa berenergi setelah hari yang panjang mengerjakan sesuatu yang bermakna. Perbedaannya bukan pada jam kerja — melainkan pada keselarasan.",
        "Benar-benar hidup, dalam arti yang paling dalam, berarti secara rutin terlibat dengan hal-hal yang terasa bermakna. Tidak setiap tugas perlu terasa transenden, tapi jika seluruh hidupmu adalah tugas-tugas yang tidak berarti bagimu, kekosongan itu akan terakumulasi.",
        "Pertanyaan terpenting bukan 'apa yang harus aku lakukan dengan hidupku?' — melainkan 'apa yang terus aku kembali lakukan, bahkan ketika tidak ada yang melihat?' Jawaban atas pertanyaan itu lebih jujur dari kuis karir manapun.",
      ]
    },
    {
      id: 5, category: "Pengenalan Diri", color: "#8b6fae", readTime: "6 menit",
      title: "Blind Spot-mu: Apa yang Tidak Bisa Kamu Lihat tentang Dirimu",
      summary: "Setiap orang memiliki kesenjangan antara siapa yang mereka pikir mereka adalah dan siapa mereka sebenarnya. Mengetahui bahwa kesenjangan ini ada adalah bentuk kebijaksanaan tersendiri.",
      sources: [
        { label: "Luft, J. & Ingham, H. (1955). The Johari Window. ResearchGate", url: "https://www.researchgate.net/figure/The-Johari-Window-Luft-and-Ingham-1955-The-Open-domain-represents-those-aspects-of_fig1_29810621" },
        { label: "Positive Psychology — How to Use The Johari Window for Leadership", url: "https://positivepsychology.com/johari-window/" },
      ],
      content: [
        "Johari Window adalah model sederhana namun kuat yang dikembangkan oleh psikolog Joseph Luft dan Harrington Ingham pada 1955. Model ini membagi kesadaran diri menjadi empat area: apa yang diketahui oleh diri sendiri dan orang lain (terbuka), apa yang hanya diketahui oleh diri sendiri (tersembunyi), apa yang hanya diketahui oleh orang lain (blind spot), dan apa yang tidak diketahui oleh siapapun (tidak diketahui).",
        "Blind spot adalah hal-hal yang diperhatikan orang lain tentang kamu yang benar-benar tidak bisa kamu lihat sendiri. Kamu mungkin pikir kamu bersikap langsung sementara orang lain mengalaminya sebagai kasar. Kesenjangan ini penting karena mempengaruhi bagaimana hubunganmu sebenarnya berjalan.",
        "Cara mengakses blind spot bukan dengan bertanya 'apa blind spot-ku?' Melainkan dengan bertanya kepada orang-orang yang mengenalmu dengan baik: 'Kapan aku pernah membuatmu frustrasi? Apa yang aku lakukan yang tampaknya bertentangan dengan apa yang aku inginkan?' Jawaban mereka, meski tidak nyaman, adalah emas.",
      ]
    },
  ]
};

export default function KnowledgePage() {
  const { lang, t } = useLang();
  const articles = articlesData[lang];

  return (
    <div style={{
      height: "100vh", background: "#0f0f1a", color: "#e8e8f0",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      display: "flex", flexDirection: "column", overflow: "hidden"
    }}>

      {/* Navbar */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px 40px", borderBottom: "1px solid #2e2e50",
        background: "#0f0f1a", flexShrink: 0, zIndex: 10
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, color: "#e8e8f0", textDecoration: "none" }}>
          <span style={{ color: "#8888aa", fontSize: 18 }}>←</span>
          <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg, #c9a96e, #8b6fae)" }} />
          <span style={{ fontSize: 17, fontWeight: 600 }}>Solra</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <LangToggle />
          <Link href="/chat" style={{
            padding: "9px 22px", borderRadius: 999, fontSize: 14, fontWeight: 500,
            background: "#c9a96e", color: "#0f0f1a", textDecoration: "none"
          }}>
            {t("Start Chat", "Mulai Chat")}
          </Link>
        </div>
      </nav>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>

        {/* Header */}
        <header style={{ padding: "64px 40px 40px", textAlign: "center", maxWidth: 680, margin: "0 auto" }}>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, marginBottom: 16, lineHeight: 1.2 }}>
            {t("Know Yourself Better", "Kenali Dirimu Lebih Baik")}
          </h1>
          <p style={{ fontSize: 17, color: "#8888aa", lineHeight: 1.7 }}>
            {t(
              "Short reads on self-discovery, psychology, and the art of figuring out what actually matters to you.",
              "Bacaan singkat tentang self-discovery, psikologi, dan seni memahami apa yang sebenarnya penting bagimu."
            )}
          </p>
        </header>

        {/* Articles */}
        <main style={{ padding: "0 40px 80px", maxWidth: 780, margin: "0 auto" }}>
          {articles.map((article) => (
            <article key={article.id} style={{
              background: "#1a1a2e", borderRadius: 20,
              padding: "36px 40px", border: "1px solid #2e2e50", marginBottom: 24
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{
                  fontSize: 12, padding: "4px 14px", borderRadius: 999, fontWeight: 500,
                  background: `${article.color}18`, color: article.color, border: `1px solid ${article.color}33`
                }}>{article.category}</span>
                <span style={{ fontSize: 12, color: "#8888aa" }}>{article.readTime} {t("read", "baca")}</span>
              </div>

              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, lineHeight: 1.3 }}>{article.title}</h2>

              <p style={{
                color: "#8888aa", lineHeight: 1.75, marginBottom: 28, fontSize: 15, fontStyle: "italic",
                borderLeft: `3px solid ${article.color}44`, paddingLeft: 16
              }}>{article.summary}</p>

              <div style={{ borderTop: "1px solid #2e2e50", paddingTop: 24 }}>
                {article.content.map((para, i) => (
                  <p key={i} style={{
                    fontSize: 14, lineHeight: 1.85, color: "#c8c8d8",
                    marginBottom: i < article.content.length - 1 ? 18 : 0
                  }}>{para}</p>
                ))}
              </div>

              {/* Sources */}
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #2e2e50" }}>
                <p style={{ fontSize: 11, color: "#8888aa", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600 }}>
                  {t("Sources", "Sumber")}
                </p>
                {article.sources.map((src, i) => (
                  <a key={i} href={src.url} target="_blank" rel="noopener noreferrer" style={{
                    display: "block", fontSize: 12, color: article.color, marginBottom: 4,
                    lineHeight: 1.5, opacity: 0.8, textDecoration: "none"
                  }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "0.8")}
                  >↗ {src.label}</a>
                ))}
              </div>
            </article>
          ))}

          {/* CTA */}
          <div style={{
            borderRadius: 20, padding: "48px 40px", textAlign: "center",
            background: "linear-gradient(135deg, #1a1a2e, #16162a)", border: "1px solid #2e2e50"
          }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
              {t("Ready to apply this to yourself?", "Siap menerapkan ini pada dirimu?")}
            </h2>
            <p style={{ color: "#8888aa", marginBottom: 28, fontSize: 15 }}>
              {t("Reading about self-discovery is different from actually doing it.", "Membaca tentang self-discovery berbeda dengan benar-benar melakukannya.")}
            </p>
            <Link href="/chat" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "13px 32px", borderRadius: 999, fontWeight: 600, fontSize: 15,
              background: "linear-gradient(135deg, #c9a96e, #8b6fae)", color: "#0f0f1a", textDecoration: "none"
            }}>
              {t("Start Your Session →", "Mulai Sesimu →")}
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
