/**
 * Created by Josh Pagley on 5/7/14.
 */

//Models
var Member = require('../models/member.js');

exports.create = function(req, res, callback){
    var msgObj = req.body;

    if(callback){
       if(typeof callback === 'function'){
           if(!msgObj.accountEmail){
               return callback(new Error('Account email is required.'), null);
           }

           if(!msgObj.accountPassword){
               return callback(new Error('Account password is required.'), null);
           }

           var newMember = new Member();
           newMember['name'] = msgObj.name;
           newMember['email'] = msgObj.accountEmail;
           newMember['password'] = newMember.generateHash(msgObj.accountPassword);

           newMember.save(function(error, member){
               if(error){
                   callback(error, null);
               } else {
                   callback(null, member);
               }
           })
       } else {
           console.log('callback is not a function.');
       }
    }
}

//{'id': churchId}
exports.retrieve = function(req, res){
    var msgObj = req.query;
    console.log(msgObj);

    if(!msgObj.id){
        return res.json(400, {'error': 'id is required.'});
    }

    Member.find({'memberships': msgObj.id}, function(error, members){
        if(error){
            console.log(error);
            return res.json(500, {'error': 'Server Error.', 'mongoError': error});
        } else if (!members || members.length < 1){
            console.log('No members for that church id.');
            return res.json(400, {'error': 'No members for that church id.'});
        } else {
            return res.json(200, {'members': members});
        }
    });

   /* Member.findOne({'email': 'jdpagley@yahoo.com'}, function(error, members){
        if(error){
            console.log(error);
        } else if (!members || members.length < 1) {
            console.log('no members.');
            console.log(members);
        } else {
            console.log(members);
            members.memberships.push(msgObj.id);

            members.save(function(error){
                if(error){
                    console.log(error);
                }
            })
        }
    });

    Member.findOne({'email': 'pagleyjohn@yahoo.com'}, function(error, members){
        if(error){
            console.log(error);
        } else if (!members || members.length < 1) {
            console.log('no members.');
            console.log(members);
        } else {
            console.log(members);
            members.memberships.push(msgObj.id);

            members.save(function(error){
                if(error){
                    console.log(error);
                }
            })
        }
    });

    Member.findOne({'email': 'jkpagley@yahoo.com'}, function(error, members){
        if(error){
            console.log(error);
        } else if (!members || members.length < 1) {
            console.log('no members.');
            console.log(members);
        } else {
            console.log(members);
            members.memberships.push(msgObj.id);

            members.save(function(error){
                if(error){
                    console.log(error);
                }
            })
        }
    }); */

   /* Member.create({
        type: 'member',
        name: 'Josh Pagley',
        email: 'jdpagley@yahoo.com',
        password: 'josh',
        address: {
            street: '6312 SE 10th PL',
            city: 'Ocala',
            state: 'FL',
            'zip': '34472'
        },
        phone: '111-222-3333',
        birthdate: '1/16/95',
        gender: 'Male',
        relationshipStatus: 'single',
        bio: 'I strive for excellence in everything I do. I am a developer and entrepreneur.',
        interests: ['javascript', 'startups', 'software', 'tech', 'programming'],
        memberships: ["53a2fe4b32a9281b1d2605bb"]
    }, function(error){
        if(error){
            console.log(error);
        }
        console.log('success');
    });

    Member.create({
        type: 'member',
        name: 'John Pagley',
        email: 'pagleyjohn@yahoo.com',
        password: 'john',
        address: {
            street: '6312 SE 10th PL',
            city: 'Ocala',
            state: 'FL',
            'zip': '34472'
        },
        phone: '111-222-3333',
        birthdate: '1/16/95',
        gender: 'Male',
        relationshipStatus: 'single',
        bio: 'I strive for excellence in everything I do. I am a developer and entrepreneur.',
        interests: ['marketing', 'startups', 'html', 'css', 'google', 'seo'],
        memberships: ["53a2fe4b32a9281b1d2605bb"]
    }, function(error){
        if(error){
            console.log(error);
        }
        console.log('success');
    });

    Member.create({
        type: 'member',
        name: 'Jeremy Pagley',
        email: 'jkpagley@yahoo.com',
        password: 'jeremy',
        address: {
            street: '6312 SE 10th PL',
            city: 'Ocala',
            state: 'FL',
            'zip': '34472'
        },
        phone: '111-222-3333',
        birthdate: '1/16/95',
        gender: 'Male',
        relationshipStatus: 'single',
        bio: 'I strive for excellence in everything I do. I am a developer and entrepreneur.',
        interests: ['photoshop', 'ios', 'games', 'programming', 'business'],
        memberships: ["53a2fe4b32a9281b1d2605bb"]
    }, function(error){
        if(error){
            console.log(error);
        }
        console.log('success');
    });

    Member.create({
        type: 'member',
        name: 'Jeff Pagley',
        email: 'jeffjr@jenkinscars.com',
        password: 'jeff',
        address: {
            street: '6312 SE 10th PL',
            city: 'Ocala',
            state: 'FL',
            'zip': '34472'
        },
        phone: '111-222-3333',
        birthdate: '1/16/95',
        gender: 'Male',
        relationshipStatus: 'single',
        bio: 'I strive for excellence in everything I do. I am a developer and entrepreneur.',
        interests: ['information technology', 'microsoft', 'security', 'working out'],
        memberships: ["53a2fe4b32a9281b1d2605bb"]
    }, function(error){
        if(error){
            console.log(error);
        }
        console.log('success');
    }); */

}

//{'id': memberId}
exports.retrieveMemberById = function(req, res){
    var msgObj = req.query;
    console.log(msgObj);

    if(!msgObj.id){
        return res.json(400, {'error': 'id is required.'});
    }

    Member.findOne({'_id': msgObj.id}, function(error, member){
        if(error){
            console.log(error);
            return res.json(500, {'error': 'Server Error.', 'mongoError': error});
        } else if (!member){
            console.log('No member with that id.');
            return res.json(400, {'error': 'No member with that id.'});
        } else {
            return res.json(200, {'member': member});
        }
    });
}

exports.retrieveChurchAdminMember = function(req, email, password, done){
    // Find church whose email is the same as the forms email
    // we are checking to see if the church trying to login exists.
    Member.findOne({'email': email}).populate('admin_of').exec(function(error, member){
        // if there are any errors, return the error before anything else
        if(error){
            return done(error);
        }

        // If no church is found then return the message
        if(!member){
            return done(null, false, req.flash('loginMessage', 'No Administrative user found.'));
        }

        //If church is found but password is wrong
        if (!member.validPassword(password)){
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
        }

        // all is well, return successful church
        return done(null, member);
    });
}