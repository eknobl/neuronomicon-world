with open("src/app/page.tsx", "r") as f:
    content = f.read()

# Make sure to replace <HazardStripes />
content = content.replace("<HazardStripes />", "<HazardStripes className=\"h-[32px] w-full\" />")

# The issue is that DecoPlus etc don't have the "deco" class on them anymore.
# And maybe the reviewer meant that because they don't have "deco" (which might have had position or maybe margin/flex behavior?), they clump together.
# Let's just add the "deco" class back to them!
content = content.replace('<DecoPlus className="deco-plus" />', '<DecoPlus className="deco deco-plus" />')
content = content.replace('<DecoArrows className="deco-arrows" />', '<DecoArrows className="deco deco-arrows" />')
content = content.replace('<DecoSlash />', '<DecoSlash className="deco deco-slashes" />')

with open("src/app/page.tsx", "w") as f:
    f.write(content)
