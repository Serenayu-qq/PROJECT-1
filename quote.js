document.addEventListener("DOMContentLoaded", function () {
    const sentences = [
        " — Alice, 30, Unsure, Queer, Boo’d Up",
        "— Olivia, 22, She/Her, Heterosexual, Single",
        "-K, 31, She/Her, Queer, Domestic Partnership",
        "— Eric Mersmann, 40, He/Him, Bi, Married",
        "— Hellion, 27, She/Her, Queer, In Love",
        "— Alaina Leary, 25, She/They, Queer, Engaged",
        " — Elizabeth, 27, She/Her, Queer",
        "— Anna Swenson, 28, She/Her, Queer, Married。",
        "— Joy Overbrook, 30, She/Her, Pansexual, Married",
        "— Rho Rho, 94, She/Her, Widowed"
    ];

    const paragraphs = [
        "At its core, love requires the basics of care. It's people helping each other meet needs, like food and warmth and play. It's trust that my partner is an accurate and healthy mirror for self-reflection and knowing I’m the same for them. It's acting for one another as a framework and foundation for personal evolution",
        "Love is like sinking into a warm bath at the end of an awful day. It’s being brave enough to give someone the parts of you that are messy, complicated, and not Instagram-perfect. It’s knowing that although they hold all the tools to break your heart, they’ll build you up instead",
        "Love is creation. Healthy love is generative. A healthy partnership allows those in it to be more of themselves, not less. Humility isn't necessarily humiliating. This game is a long game. Be gentle",
        "When we say, 'I don’t know how we’ll get through this except that it will be together,' and I believe us.",
        "Love is a trust I place in someone. Love is a space for refuge, for pain, and for growth. Love is walking through a world of cold, dead pain and knowing there are human hearts beating somewhere and that one of them beats for me, and then my heart flutters like a dream come true.",
        "Love is when my partner asked me to go to the animal shelter on the anniversary of my mom’s death just to make me smile — and we took home two bonded cats.。",
        "I'm not sure about romance, other than it's absurd. But my best friend and I sent each other the exact same e-mail this morning and if that isn't love, I don't know what is.",
        "Love is my partner sitting beside me during a panic attack, not telling me to stop or change, not prescribing, just being there, grounding me. It's coming with me to my therapist’s office after a self-harm scare to make sure I was safe from myself, and my therapist saying, 'He really loves you.'",
        "Feeling safe to be a true, authentic person. Having room for individual and shared passions. Knowing when everything else gets stripped away, your partner will still hold you close.",
        "Love is having total acceptance and the ability to trust and openly communicate, without the fear of judgment or rejection. That shouldn't just apply to romantic love but also to love among family and friends."
    ];

    const container = document.getElementById("container");
    const usedPositions = [];

    function getRandomPosition() {
        let x, y, overlaps;
        do {
            overlaps = false;
            x = Math.random() * (window.innerWidth - 200);
            y = Math.random() * (window.innerHeight - 30);
            for (let pos of usedPositions) {
                if (Math.abs(pos.x - x) < 150 && Math.abs(pos.y - y) < 30) {
                    overlaps = true;
                    break;
                }
            }
        } while (overlaps);
        usedPositions.push({ x, y });
        return { x, y };
    }

    sentences.forEach((text, index) => {
        const sentence = document.createElement("div");
        sentence.classList.add("sentence");
        sentence.textContent = text;

        const { x, y } = getRandomPosition();
        sentence.style.left = `${x}px`;
        sentence.style.top = `${y}px`;

        const paragraph = document.createElement("div");
        paragraph.classList.add("paragraph");
        paragraph.textContent = paragraphs[index];
        paragraph.style.left = `${x}px`;
        paragraph.style.top = `${y + 30}px`;

        sentence.addEventListener("click", function () {
            if (paragraph.style.display === "none" || paragraph.style.display === "") {
                paragraph.style.display = "block";
            } else {
                paragraph.style.display = "none";
            }
        });

        paragraph.addEventListener("click", function () {
            paragraph.style.display = "none";
        });

        container.appendChild(sentence);
        container.appendChild(paragraph);
    });
});



