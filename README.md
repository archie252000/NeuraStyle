# NeuraStyle
NeuraStyle is a web application that is used to stylize an image that is uploaded by the user. The objective of this application is to showcase a modified version of the Neural Style Transfer algorithm as delineated in [**this**](https://arxiv.org/abs/1508.06576) research paper and make an image appear in the style of another image.  
For example, we need to transfer the style of image a to b.
| Content Image  | Style Image | Result |
| ------------- | ------------- | ------------- |
| ![alt text](AppImages/NST1.JPG)  |![alt text](AppImages/NST1.JPG)|![alt text](AppImages/NST1.JPG)  |
# Table of Contents  
1) [Detailed Information](#info)  
2) [Technologies used](#technologies)
3) [Demo Video](#video)
4) [Setup](#setup)
5) [Usage](#usage)
6) [License](#license)







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
The algoritm uses a pretrainined VGG19 ConvNet. We pass the **Content Image** through the network upto a certain layer to compute the Content Error & and do the same with the **Style Image** to get Style Error. Then we use a weighted some of both the erros to get total error. As the total error of the function is a function of a  randomly generated image, optimizing it will return image with transfered style, so we use **Adam Optimizer** to do the same. For a detailed explanation of the algorithm, I encourage you to give the aforementioned paper a read. Althoug the algorithm used is a modified version of the one in the research paper, it is similar enough to understand what is happening by reading the paper. Below is the algorithm used :
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
   
<a name="technologies"/>

## Technologies
- **Frontend:** Html, Css, JavaScript
- **Backend:** Flask
- **Other:** Tensorflow, PIL, Python


  
  
```



