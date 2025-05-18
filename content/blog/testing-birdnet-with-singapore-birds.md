---
title: "Testing BirdNET In-Built model with Singapore Birds"
date: May 18, 2025
excerpt: "Evaluating BirdNET’s accuracy on common Singaporean birds reveals strengths and weaknesses"
coverImage: "/blogs/hornbill_call.png"
readTime: "10 min read"
tags: ["BirdNET", "bioacoustics"]
---

#### Overview

How well can a machine tell the difference between a myna and a munia? This article dives into that question using BirdNET — the open-source bird sound recognizer — tested on 30 of Singapore's most familiar feathered residents. The goal: to assess how accurately the default BirdNET model performs when given real-world recordings from Southeast Asia.

#### Setup and Progress

I began by cloning the BirdNET-Analyzer repository and building a Docker image locally. There were a few bumps — the Dockerfile needed path fixes — but it was soon up and running.

<details>
<summary>Show Dockerfile</summary>

```Dockerfile
FROM python:3.11

# Install FFmpeg
RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy BirdNET code
COPY . .

# Install Python dependencies
RUN pip install --upgrade pip \
 && pip install .

# Set entrypoint
ENTRYPOINT ["python3", "-m", "birdnet_analyzer.analyze"]
```

</details>

#### Species Targeted for Evaluation

To make the experiment as relevant as possible, I used the 30 species selected for NParks' [Garden Bird Watch](http://nparks.gov.sg/nature/community-in-nature/garden-bird-watch) — birds that the public is encouraged to identify in parks and green spaces. Of these, I gathered 10 high-quality recordings for 27 species.

<details>
  <summary>List of the Birds are the following</summary>
  <ol>
    <li>Common Myna (Acridotheres tristis)</li>
    <li>Large-billed Crow (Corvus macrorhynchos)</li>
    <li>Yellow-vented Bulbul (Pycnonotus goiavier)</li>
    <li>Asian Koel (Eudynamys scolopaceus)</li>
    <li>White-breasted Waterhen (Amaurornis phoenicurus)</li>
    <li>Asian Glossy Starling (Aplonis panayensis)</li>
    <li>Scarlet-backed Flowerpecker (Dicaeum cruentatum)</li>
    <li>Common Iora (Aegithina tiphia)</li>
    <li>Swinhoe's White-eye (Zosterops simplex)</li>
    <li>Collared Kingfisher (Todiramphus chloris)</li>
    <li>Red Junglefowl (Gallus gallus)</li>
    <li>Eurasian Tree Sparrow (Passer montanus)</li>
    <li>White-throated Kingfisher (Halcyon smyrnensis)</li>
    <li>Common Tailorbird (Orthotomus sutorius)</li>
    <li>Rock Pigeon (Columba livia)</li>
    <li>Olive-backed Sunbird (Cinnyris jugularis)</li>
    <li>Spotted Dove (Spilopelia chinensis)</li>
    <li>Brown-throated Sunbird (Anthreptes malacensis)</li>
    <li>Blue-tailed Bee-eater (Merops philippinus)</li>
    <li>Blue-throated Bee-eater (Merops viridis)</li>
    <li>Pink-necked Green Pigeon (Treron vernans)</li>
    <li>Sunda Pygmy Woodpecker (Yungipicus moluccensis)</li>
    <li>Oriental Pied Hornbill (Anthracoceros albirostris)</li>
    <li>Common Flameback (Dinopium javanense)</li>
    <li>Scaly-breasted Munia (Lonchura punctulata)</li>
    <li>Zebra Dove (Geopelia striata)</li>
    <li>House Crow (Corvus splendens)</li>
  </ol>

#### Species Not Used

Out of the 30 Garden Birdwatch species, a few species couldn’t be retrieved from Xeno-Canto:

* Javan Myna (*Acridotheres javanicus*)
* Oriental Magpie-Robin (*Copsychus saularis*)
* Black-naped Oriole (*Oriolus chinensis*)

> Some species are under extreme pressure due to trapping or harassment. The open availability of high-quality recordings of these species can make the problems even worse. For this reason, streaming and downloading of these recordings is disabled. ([xeno-canto](https://xeno-canto.org/help/FAQ#restricted))
</details>


#### Evaluation: How Accurate Is BirdNET?

With coordinates set to Singapore (lat 1.35, lon 103.8), each file was scored based on the dominant call and filtered for confidence (>85%).

<details>
<summary>Show R code used for analysis</summary>

```r
df |>
  filter(Confidence > 0.85) |>
  mutate(duration = `End Time (s)` - `Begin Time (s)`) |>
  group_by(File, detected_com_name, original_com_name) |>
  summarise(total_duration = sum(duration)) |>
  slice_max(total_duration, n = 1) |>
  ungroup() |>
  mutate(isCorrect = if_else(detected_com_name == original_com_name, 1, 0)) |>
  group_by(original_com_name) |>
  summarise(
    numOfRecordings = n(),
    CorrectId = sum(isCorrect),
    recall = round(CorrectId / numOfRecordings * 100, 0)
  )
```

</details>

#### Results: Recall Rate by Species

![Precision by Bird Species](/blogs/birdnet_default_model_plot.png)

BirdNET excelled with species like the Spotted Dove and White-breasted Waterhen — both of which had a perfect 100% recall. These birds likely benefit from clear, recognizable calls that cut through ambient noise.

Middle performers, like the Eurasian Tree Sparrow and Olive-backed Sunbird, returned solid but imperfect results. These birds may have overlapping vocal traits with other species or simply appear less prominently in the model’s training data.

Then there were the challenges: species like the Sunda Pygmy Woodpecker, which scored a dismal 0%. Its rapid trilling — a sound not unlike the flutter of an insect wing or a rustling leaf — blends easily into the soundscape. Distinguishing it, even for a trained algorithm, proves difficult.

#### What Comes Next?

This experiment shows that BirdNET’s default model has real potential — and real limits. For species with distinctive, well-represented vocalizations, it's highly reliable. But for subtler, noisier, or less common birds, its accuracy drops.

Which brings us to the next phase. This trial was only the beginning. The next step is to fine-tune BirdNET’s model specifically for Singaporean birds — to build something more sensitive to local accents, habitat noise, and subtle song patterns.

Stay tuned. The jungle may be noisy, but we’re getting better at listening.