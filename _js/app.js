$(function(){
   
    $('#search-form').submit(function(e){
        e.preventDefault();
    });
});

function search(){
    //Clear the Results
    $('#results').html('');
    $('#buttons').html('');
    
    //Get Form Values
    var query = $('#query').val();
    
    $.get(
        'https://www.googleapis.com/youtube/v3/search',{
            part: 'snippet, id',
            q : query,
            type: 'video',
            key : 'AIzaSyB2Hf2LrUaK4TFnsYZeVQjfvt2xLI_NUFw'
        },
        function(data){
            var prevPageToken = data.prevPageToken,
                nextPageToken = data.nextPageToken;
            
            console.log(data);
            
            $.each(data.items, function(i, item){
               var output = getOutput(item);
                
               $('#results').append(output);
            });
            
            var buttons = getButtons(prevPageToken, nextPageToken);
            
            $('#buttons').append(buttons);
        }
    );
}

//Next Page Function

function nextPage(){
    var token = $('#nextButton').data('token'),
        query = $('#nextButton').data('query');
    
        //Clear the Results
    $('#results').html('');
    $('#buttons').html('');
    
    //Get Form Values
    var query = $('#query').val();
    
    $.get(
        'https://www.googleapis.com/youtube/v3/search',{
            part: 'snippet, id',
            q : query,
            pageToken : token,
            type: 'video',
            key : 'AIzaSyB2Hf2LrUaK4TFnsYZeVQjfvt2xLI_NUFw'
        },
        function(data){
            var prevPageToken = data.prevPageToken,
                nextPageToken = data.nextPageToken;
            
            console.log(data);
            
            $.each(data.items, function(i, item){
               var output = getOutput(item);
                
               $('#results').append(output);
            });
            
            var buttons = getButtons(prevPageToken, nextPageToken);
            
            $('#buttons').append(buttons);
        }
    );
}


//Previous Page Function

function prevPage(){
    var token = $('#prevButton').data('token'),
        query = $('#prevButton').data('query');
    
        //Clear the Results
    $('#results').html('');
    $('#buttons').html('');
    
    //Get Form Values
    var query = $('#query').val();
    
    $.get(
        'https://www.googleapis.com/youtube/v3/search',{
            part: 'snippet, id',
            q : query,
            pageToken : token,
            type: 'video',
            key : 'AIzaSyB2Hf2LrUaK4TFnsYZeVQjfvt2xLI_NUFw'
        },
        function(data){
            var prevPageToken = data.prevPageToken,
                nextPageToken = data.nextPageToken;
            
            console.log(data);
            
            $.each(data.items, function(i, item){
               var output = getOutput(item);
                
               $('#results').append(output);
            });
            
            var buttons = getButtons(prevPageToken, nextPageToken);
            
            $('#buttons').append(buttons);
        }
    );
}

function getOutput(item){
    var videoId = item.id.videoId,
        title   = item.snippet.title,
        description = item.snippet.description,
        thumb   = item.snippet.thumbnails.high.url,
        channelTitle = item.snippet.channelTitle,
        videoDate   = item.snippet.publishedAt;
    
    var output = '<div class="row">'+
        '<div class="col-sm-4">'+
        '<img class="img-responsive" src="'+thumb+'" alt="thumbnail">'+
        '</div>'+
        '<div class="col-sm-8">'+
        '<h3><a href="http://www.youtube.com/embed/'+videoId+'" class="fancybox fancybox.iframe">'+title+'</a></h3>'+
        '<small><span class="cTitle">'+channelTitle+'</span> on '+ videoDate + '</small>'+
        '<p>'+description+'</p>'+
        '</div>'+
        '</div><hr>';
    
    return output;
}

function getButtons(prevPageToken, nextPageToken){
    if(!prevPageToken){
        var btnOutput = '<button class="btn btn-warning pull-right" id="nextButton" data-token="'+nextPageToken+'" data-query="'+query+'" onclick="nextPage();">Next Page &raquo;</button>'; 
    } else {
        var btnOutput = '<button class="btn btn-warning pull-left" id="prevButton" data-token="'+prevPageToken+'" data-query="'+query+'" onclick="prevPage();">&laquo; Previous Page </button>'+
        '<button class="btn btn-warning pull-right" id="nextButton" data-token="'+nextPageToken+'" data-query="'+query+'" onclick="nextPage();">Next Page &raquo;</button>'; 
    }
    
    return btnOutput;
}