const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
    GraphQLEnumType,
    GraphQLUnionType
} = require('graphql');

const mongojs = require('mongojs');

var db = mongojs('mongodb://jaideep:yrals1234@ds235169.mlab.com:35169/jaideepdb', ['stories']);
var ObjectId = mongojs.ObjectId

const TitleObjectType = new GraphQLObjectType({
    name:'TitleObject',
    description: 'Title Object Documentation',
    fields:() => ({
        // id: {type: GraphQLID},
        "title": {type: GraphQLString},
        "option": {type: GraphQLString},
        "titleVisual": {type: GraphQLString},
        "titleVisualType": {type: GraphQLString},
        "titleVisualEffects": {type: GraphQLString},
        "titleVisualAudio": {type: GraphQLString},
        "titleVisualStart": {type: GraphQLString},
        "titleVisualEnd": {type: GraphQLString},
        "titleVisualCrop": {type: GraphQLString},
        "Editclipids": {type: GraphQLString},
        "clipPathTitle": {type: GraphQLString},
        "titleStoryId": {type: GraphQLString},
        "titleStoryGif": {type: GraphQLString},
        "EditChecked": {type: GraphQLString}
    })
})

const ImageObjectType = new GraphQLObjectType({
    name:'Image Object',
    description: 'Image Type used to create a clip'/
                 'Collectively with Video / Footage classified as a Visual object',
    fields:() => ({
        "dtext": {type: GraphQLString},
        "source": {type: GraphQLString},
        "TextTags": {type: GraphQLString},
        "atext": {type: GraphQLString},
        "dvoice": {type: GraphQLString},
        "vsource": {type: GraphQLString},
        "clip_transition": {type: GraphQLString},
        "customAudio": {type: GraphQLString},
        "Audiourl": {type: GraphQLString},
        "cliptxtOrientation": {type: GraphQLString},
        "clip_title": {type: GraphQLString},
        "clipType": {type: GraphQLString},
        "clipListNo": {type: GraphQLString},
        "clipTitle": {type: GraphQLString},
        "vsrc": {type: GraphQLString}, //URL
        "vtype": {type: GraphQLString},
        "vmute": {type: GraphQLString},
        "vstart": {type: GraphQLString},
        "vend": {type: GraphQLString},
        "vcrop": {type: GraphQLString},
        "storyId": {type: GraphQLString},
        "storyGif": {type: GraphQLString},
        "visualEffect": {type: GraphQLString},
        "clipid": {type: GraphQLString},
        "isedit": {type: GraphQLString},
        "clipPath": {type: GraphQLString}, //URL
        "clipNo": {type: GraphQLInt}
    })
})

const VideoObjectType = new GraphQLObjectType({
    name:'Video or Footage Object',
    description: 'Footage or Video Type used to create a clip'/
                 'Collectively with Images classified as a Visual object',
    fields:() => ({
        "dtext":{type: GraphQLString},
        "source": {type: GraphQLString},
        "clipTitle": {type: GraphQLString},
        "TextTags": {type: GraphQLString},
        "atext": {type: GraphQLString},
        "dvoice": {type: GraphQLString},
        "vsrc": {type: GraphQLString}, //URL
        "vtype": {type: GraphQLString},
        "sourceVideo": {type: GraphQLString}, //URL
        "Targetvsrc": {type: GraphQLString},
        "vmute": {type: GraphQLString},
        "vstart": {type: GraphQLString},
        "vend": {type: GraphQLString},
        "vcrop": {type: GraphQLString},
        "vsource": {type: GraphQLString},
        "clip_transition": {type: GraphQLString},
        "clip_title": {type: GraphQLString},
        "visualEffect": {type: GraphQLString},
        "customAudio": {type: GraphQLString},
        "Audiourl": {type: GraphQLString},
        "cliptxtOrientation": {type: GraphQLString},
        "clipPath": {type: GraphQLString}, //URL
        "clipNo": {type: GraphQLInt},
        "clipType": {type: GraphQLString},
        "storyId": {type: GraphQLString},
        "storyGif": {type: GraphQLString}, //URL
        "clipListNo": {type: GraphQLString},
        "isedit": {type: GraphQLString},
        "clipid": {type: GraphQLString}
    })
})

const VisualType = new GraphQLUnionType({
    name: 'Visuals',
    types: [ ImageObjectType, VideoObjectType ],
    resolveType(value) {
        if (value instanceof VideoObjectType) { //verify what isInstance of Video does
            return VideoObjectType;
        }
        if (value instanceof ImageObjectType) { //verify what isInstance of Image does
          return ImageObjectType;
        }
    }
})

const VideoTranstionsType = new GraphQLObjectType({
    name:'videoTranstions',
    description: 'Transition effect to be applied, if place at the end of a clip.',
    fields:() => ({
        name: {type: GraphQLString},
        type: {type: GraphQLString},
        path: {type: GraphQLString}
    })
})

const BackgroundMusicType = new GraphQLObjectType({
    name:'backgroundMusicData',
    description: 'Background Music Applied to a Clip or Video.',
    fields:() => ({
        name: {type: GraphQLString},
        id: {type: GraphQLString},
        url: {type: GraphQLString}
    })
})

const ClipDataType = new GraphQLObjectType ({
    name:'All Clip Refs',
    description: 'Clip constitues a Video. Clip Data refers to the meta info of clip',
    fields:() => ({
        clipid: {type: GraphQLString},
        clipNo: {type: GraphQLInt},
        clipListNo: {type: GraphQLString},
        clipTitle: {type: GraphQLString},
        clipPath: {type: GraphQLString},
        clipType: {type: GraphQLString},
        cliptxtOrientation: {type: GraphQLString},
        TranisitonClip: {type: GraphQLString}, //alias need => transclipPath
        VisualData: {type: GraphQLString}, //needs to be fixed
    })
})

const ZoomObjectType = new GraphQLObjectType ({
    name:'zoomObjects',
    description: 'Clip constitues a Video. Clip Data refers to the meta info of clip',
    fields:() => ({
        clipid:{type: GraphQLString},
        articleID: {type: GraphQLString},
        zoomObjectURL: {type: GraphQLString}, //URL
    })
})

const TransFramesType = new GraphQLObjectType ({
    name: "VisualFrames",  //'Transition Frames',
    description: 'Frames for the Transition CLips First & Last.',
    fields:() => ({
        clipid: {type: GraphQLString},
        lastFrame: {type: GraphQLString}, //URL
        firstFrame: {type: GraphQLString}
    })
})

const TransitionClipType = new GraphQLObjectType ({
        name: 'TransitionClips',//'Transition Clips',
        description: 'Transition Clip Path & Log Path for a Clip',
        fields:() => ({
            // clipid: {type: GraphQLString},
            TranisitonClipLog: {type: GraphQLString},
            TranisitonClip: {type: GraphQLString} //alias need => transclipPath
        })
})

const StoryType = new GraphQLObjectType({
    name:'Story',
    description: 'Story Fields Documentation',
    fields:() => ({
        _id: {type: GraphQLID},
        date: {type: GraphQLInt},
        id: {type: GraphQLString},//needs alias articleID
        url: {type: GraphQLString},
        urlMD5: {type: GraphQLString},
        authorname: {type: GraphQLString},
        language: {type: GraphQLString},
        type: {type: GraphQLString},
        subcat: {type: GraphQLString},
        addedtime: {type: GraphQLInt},
        status: {type: GraphQLString},
        starred: {type: GraphQLInt},
        starredBy: {type: GraphQLString},
        text: {type: GraphQLString},
        title: {type: GraphQLString},
        gist: {type: GraphQLList(GraphQLString)},
        VideoTitleObject: {type: TitleObjectType},
        finalImages: {type: GraphQLList(GraphQLString)},
        StoryBY: {type: GraphQLString},
        CreatedBY: {type: GraphQLString},
        //VisualData: {type: GraphQLList(VisualType)},
        gistAudio: {type: GraphQLList(GraphQLString)},
        AudioVoice: {type: GraphQLString},
        /* BGmusic: { //Duplicate field with hyphen solved.
            type: GraphQLString,
            resolve: (bgpath) => {
                // get the value `bg-music` from the passed object 'bg'
                const bgm = bgpath['bg-music'];
                return bgm;
         }, */
        // "bg-music": {type: GraphQLString}, //Duplicate field with hyphen issue.
        templateName: {type: GraphQLString},
        templateId: {type: GraphQLString},
        backgroundMusicData: {type: BackgroundMusicType},
        video_transtion: {type: GraphQLString}, //needs alias
        // videoTranstions: {type: VideoTranstionsType}, //needs alias
        MuteAllAudio: {type: GraphQLString},
        videoClips: {type: GraphQLString},
        "video_format": {type: GraphQLString},
        videoAdded: {type: GraphQLInt},
        imagecount: {type: GraphQLString},
        AddBy: {type: GraphQLString},
        zoomObjects: {type: ZoomObjectType},
        // VisualFrames: {type: TransFramesType},
        TransitionsProcessed: {type: GraphQLString},
        TransitionClips: {type: TransitionClipType},
        // KeywordsIndexes: null, //Why null?
        TotolTransitions: {type: GraphQLInt},
        videoPath: {type: GraphQLString},
        server: {type: GraphQLString},
        endtime: {type: GraphQLInt},
        log: {type: GraphQLString},
        videoEditedOn: {type: GraphQLInt},
        reprocess: {type: GraphQLString},
        EditBy: {type: GraphQLString},
        InProcess: {type: GraphQLString},
        CustomOutroPath: {type: GraphQLString},
        CustomOutro: {type: GraphQLString},
        ecoStatus: {type: GraphQLString},
        approver: {type: GraphQLString},
        ApproverEmail: {type: GraphQLString},
        publishYouTube: {type: GraphQLString},
        publishFacebook: {type: GraphQLString},
        publishWordpress: {type: GraphQLString},
        publishDailymotion: {type: GraphQLString},
        // CMSStatus: null, //Why null?
        approvedon: {type: GraphQLInt},
        RejectMainReasonCategory: {type: GraphQLString},
        RejectReason: {type: GraphQLString},
        RejectCustomReason: {type: GraphQLString}
    })
})

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        story: {
            type: StoryType,
            args:{
                id: {type:GraphQLID},
                date: {type: GraphQLInt},
                // articleID: {type: GraphQLString}
            },
            resolve: (root, args) => {
                return new Promise((resolve, reject) => {
                    if (args.hasOwnProperty('id')){
                    // Returning the position in the iterator
                        db.stories.findOne({_id:ObjectId(args.id)}, {}, (err, res) => {
                            err ? reject(err): resolve(res);
                        });
                    } else {
                        db.stories.findOne(args, {}, (err, res) => {
                            err ? reject(err) : resolve(res);
                        });
                    }
                });
            }
        },
        // clip: {
        //     type: ClipDataType,
        //     args: {
        //         clipid: {type: GraphQLString}
        //     },
        //     resolve: (root, args) => {
        //         return new Promise((resolve, reject) => {
        //             db.stories.findOne(args, {}, (err, res) => {
        //                 err ? reject(err): resolve(res);
        //             });
        //             // db.stories.findOne(args, {}, (err, res) => {
        //             //     err ? reject(err) : resolve(res);
        //             // });
        //         })
        //     }
        // }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
