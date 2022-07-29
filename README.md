# NeuraStyle
NeuraStyle is a web application that is used to stylize an image that is uploaded by the user. The objective of this application is to showcase a modified version of the Neural Style Transfer algorithm as delineated in [**this**](https://arxiv.org/abs/1508.06576) research paper and make an image appear in the style of another image.  
For example, we need to make the picture of the castle in the style of the painting(Shown Below).
| Content Image  | Style Image | Result |
| ------------- | ------------- | ------------- |
|![ST-01-min](https://user-images.githubusercontent.com/51921550/181769458-12a1ab74-ac9a-4596-bb37-e15503728d09.jpg) |![ST-02](https://user-images.githubusercontent.com/51921550/181769167-b0cbd3af-ce1a-4a41-b41a-e1cbdd70f264.jpg)| ![ST-03](https://user-images.githubusercontent.com/51921550/181769207-fc2325ec-c76d-4db6-b7f1-1f7a33c6d283.jpg)| 

# Table of Content
1) [Detailed Information](#info)  
2) [Technologies used](#technologies)
3) [Demo Video](#video)
4) [Setup](#setup)
5) [Usage](#usage)


<a name="info"/>

## Detailed Information
Let us discuss in detail, the working of this project.
There are majorly two parts to this project:
- [Application Architectue](#architecture)
- [Algorithm](#algo)
  
<a name="architecture"/>

### Application Architecture
The architecture of this web application is a simple client-server RESTful architecture.  
The server provides a REST API which takes two Base64 images (**Content Image** & **Style Image**) and returns the resultant image as response in Base64 format.

![Untitled Workspace](https://user-images.githubusercontent.com/51921550/181747249-ca9d212d-d9bd-41de-a38a-1aba74c22af9.png)

<a name="algo"/>

### Algorithm
The algorithm uses a pretrainined VGG19 ConvNet. We pass the **Content Image** through the network up to a certain layer to compute the Content Error & and do the same with the **Style Image** to get Style Error. Then we use a weighted sum of both the errors to get the total error. As the total error of the function is a function of a  randomly generated image, optimizing it will return an image with transferred style, so we use **Adam Optimizer** to do the same. For a detailed explanation of the algorithm, I encourage you to give the aforementioned paper a read. Although the algorithm used is a modified version of the one in the research paper, it is similar enough to understand what is happening by reading the paper. Below is the algorithm used :
```
function gramMatrix(Mat):
  return Mat * Mat.Transpose


function transferStyle(S, C):                  // S is style image and C is content image 
  Initialize(VGG19)                            // Initialize VGG19 Conv Network
  Initialize(random(G, size(C)))               // Initialize randomly generated image G of the same size of content image C 
  ContentLayers = ['block5_conv2']             // blocki_convj denotes ith block and convolutional layer j
  StyleLayers = ['block1_conv1',
                 'block2_conv1',
                 'block3_conv1',
                 'block4_conv1',
                 'block5_conv1']
  ContentCost = sum(pow(mod(VGG19(ContentLayers).pass(C) - VGG19(ContentLayers).pass(C)),2))
  ContentCost = normalize(ContentCost)
  StyleCost = 0
  for layer in Style Layers:
    StyleCost = StyleCost + normalize(sum(pow(mod(gramMatrix(VGG19(layer).pass(C)) -gramMatrix(VGG19(layer).pass(C))),2)))
    
   StyleCost = lambda*normalize(StyleCost)
   TotalCost = alpha*ContentCost + beta*StyleCost
   Adam.optimize(TotalCost)
  
   return G  
```
<a name="technologies"/>

## Technologies
- **Frontend:** Html, Css, JavaScript
- **Backend:** Flask
- **Other:** Tensorflow, PIL, Python


<a name="video"/>

## Demo Video
https://user-images.githubusercontent.com/51921550/181816675-bfc7a7a2-71d4-4b37-ab02-49529c69dde3.mp4

## Setup

#### Server side
```
cd NeuraStyleBackend/Server
.\env\Scripts\activate
Python -m pip install -r requirements.txt
Flask run
```
#### Client side
> **Note:** after running the server, check the port number and change the **baseUrl** accordingly in main.js in client folder

Open index.html or run with live server in VSCode.




## Usage
1) On the Landing page Click in start

![image](https://user-images.githubusercontent.com/51921550/181819986-a27c2a1e-abd7-478a-87ad-45697e1c3bee.png)

2) Upload two images(A style and a content image)

![image](https://user-images.githubusercontent.com/51921550/181820108-fe266750-adfd-4831-a7a1-59e322d86dda.png)

3) Click on transfer button on the top

![image](https://user-images.githubusercontent.com/51921550/181820287-55cfb281-b402-477a-b562-1e1e1b4f1120.png)

4) Wait

![image](https://user-images.githubusercontent.com/51921550/181820334-b4209902-fda6-450e-9a39-e48a0a3d8fca.png)

5) Final Result

![image](https://user-images.githubusercontent.com/51921550/181821890-407e9ed9-b5c0-4534-b21f-c0c762ae6b59.png)


